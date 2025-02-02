class member {
    readonly name: string
    teamName: string
    private readonly joinedYear: number = 2023

    constructor(name: string, teamName: string) {
        this.name = name // readonlyでもコンストラクターでの代入はOK
        this.teamName = teamName
    }

    /**
     * name
     */
    public changeTeamName(newName: string) : void {
        this.teamName = newName
    }

    /**
     * getJoinedYear
     */
    public getJoinedYear() {
        return this.joinedYear
    }
}

class projectMember extends member {
    role: "manager" | "none"
    constructor(name: string, teamName: string, role: "manager" | "none") {
        super(name, teamName)
        this.role = role
    }
}

const nanami = new projectMember("nanami", "oldTeam", "none")
nanami.changeTeamName("newTeam")
console.log(nanami.teamName)

// 注意：コンストラクタ引数のアクセス修飾子を使用することで、コンストラクタ内でのプロパティの定義や初期化を省略することができ、クラスの定義が簡潔に
class Person {
    constructor(public name: string, private birthYear: number) {}
    
    introduce() {
        console.log(`My name is ${this.name} and I was born in ${this.birthYear}.`);
    }
}

const person = new Person("Alice", 30);
