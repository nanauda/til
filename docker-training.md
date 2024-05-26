# Dockerについて調べたことメモ

## ファイル名について
- docker compose コマンドの実行時に compose.yml がデフォルトで読み込まれる。このとき同時に compose.override.yml も読み込まれて上書きされる。
- docker compose コマンドはデフォルトで .env から環境変数を読み込む。https://direnv.net/ などでプロジェクト毎に環境変数を切り替えると便利
- Dockerfileは、compose.ymlで使う。以下みたいになってたらDockerfileをもとにイメージが作成されている
```
web:
    build: .
```
- compose.yml VS docker-compose.yml
  - > The default path for a Compose file is compose.yaml (preferred) or compose.yml that is placed in the working directory.
  - ディレクトリ直下に置く。 `compose.yml` が今の標準 。一応 `docker-compose.yml` でも動くようにはなっている

## amd64　VS arm64
- 例えばmysqlの `5.7.12` は、amd64版しかないので、arm64のM1では動かない。両方対応したimageがある場合もある
<img width="780" alt="image" src="https://github.com/nanauda/til/assets/141910752/a087f5fd-79e0-4c72-98f8-57a029570432">

- どうすればいい?
    - 方法1:コンテナにplatform: linux/amd64のオプションを指定することで、amd64版のimageも使えるようにする。←がベター
    - 方法2:arm64版もある別なイメージを探す

## 記述方法について
- version: `version: '3'みたいなのはもう廃止されている。書かなくて良い。あってもエラーにならないというだけ
- services[must]: 配下にコンテナ名を命名していく。apacheはweb、mysqlはdbみたいなパターンが多い
- profiles: ない場合は、そのコンテナは常に起動する。記載がある場合は、その名称がコマンドで与えられたときだけ起動する
- image[↓とどちらか一つ]:だれかが作ったimageを使わせてもらうとき。Dockerhubレジストリから探してくる。mysql-serverとか
- build[↑とどちらか一つ]:Dockerfileをもとにイメージを作成したい場合は `build: .`
- environment: ある場合は環境変数を定義する。.envファイルに書いても良い
- platform: 特定のプラットフォームでコンテナを動かしたいときに使う。 `platform: linux/x86_64`だったら、M1で
    - 補足：それまでのmacはCPUがx86/64の命令セットだったが、M1はARMアーキテクチャを採用している。 `uname -m` => `arm64` で確認できる
- command: コンテナ起動後に実行するコマンド。 `command: mysqld` など。mysqldはちなみに直接MySQLデーモンが起動するコマンドで、`mysql.server start` とは違う。
- volumes:
    - バインドの場合: `"./logs:/app/logs"` みたいな感じ。ホストマシンのこのディレクトリをここにバインドという形。
    - ボリュームの場合: `db_data:/var/lib/mysql　 #　ホストディレクトリ : コンテナ内ディレクトリ` みたいな感じ。コンテナ起動時に、場所を指定しなくても勝手に場所が確保される。
        どこに確保されているか調べるには ①`docker volume inspect db_data ` => ②`docker volume inspect ${①で調べたボリューム名}`
- ports: `"3307:3306" "ホスト側ポート:コンテナ側ポート"` ホストのポート 3307 をコンテナのポート 3306 にマッピングしている。これにより、ホスト上のポート 3307 に送信されたトラフィックがコンテナ内のMySQLサーバーのポート 3306 に転送される。
- depends_on: この記述があるコンテナを起動するには、事前に、書かれている別のコンテナを起動しておくようにする
      - db
      - redis
      - elasticsearch

## コンテナ同士の通信
- 例えばwebコンテナとdbコンテナが接続されているとする
    - 各々の定義にport: 80:8080 みたいに書かれているが、この数字はホストから接続するときにしか意識しない。
    - webからdbを見るときは、 `db` のコンテナ名だけで、ポート番号は指定せずに接続できる。(docker-compose が作成する内部ネットワーク内だから) 
