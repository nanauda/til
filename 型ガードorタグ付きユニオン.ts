// 使い所：バリデーション関数を通した後に型の絞り込みを入れたい時 (レスポンスの処理とか)

// 型ガードは、値の型をもとにバリデーションをかける
// ok
const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

// ng
const isNumber = (value: unknown): boolean => {
  return typeof value === "number";
};

function numberToStirng(value: unknown) {
  if (isNumber(value)) {
    return value.toString();  //エラー 'value' is of type 'unknown'.(18046)
  }
  return value;
}

// タグ付きユニオンは、ユニオンの中に必ず共通のプロパティがあり、その値をもとにバリデーションをかける
type OkResult<T> = {
  type: "ok";
  payload: T;
};
type ErrorResult = {
  type: "error";
  payload: Error;
};
type Result<T> = OkResult<T> | ErrorResult;

function unwrapResult<T>(result: Result<T>): T {
  const { type } = result;
  if (type === "ok") {
    // ちゃんと result が絞り込まれている ver.4.4以降
    return result.payload;
  } else {
    throw result.payload;
  }
}
