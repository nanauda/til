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
 
