// 数値列挙型なので、数字が0から割り振られる
enum Position {
    Top,
    Right,
    Bottom,
    Left,
}

// 吹き出しの位置を指定するためのpropsなど
let popupPosition: Position;

popupPosition = Position.Bottom;
console.log(popupPosition) // 注意:2になる

// 文字列列挙型
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
let popupDirection : Direction
popupDirection = Direction.Right
console.log(popupDirection) // RIGHTになる

// ユニオンで型をつけることもできるが、代入時に直感的でない
type PositionType = "top" | "bottom";
let popupPosition2: PositionType;
popupPosition2 = "top";
