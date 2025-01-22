import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export default class {
	constructor(db, table) {
		//將db&table當成參數傳入，並初始化成物件
		this.db = db; //把物件放進this裡
		this.table = table;
	}

	async create(origin) {
		await this.db //"this"存取物件本身的屬性
			.insert(this.table)
			.values({
				origin,
				short: nanoid(10), //因為資料欄位short長度設為10，所以要生成長度為10的短網址
			});
		const result = await this.db
			.select()
			.from(this.table)
			.where(eq(this.table.origin, origin))
			.limit(1);
		return result.at(0);
	}

	async getOriginFromShort(short) {
		const result = await this.db
			.select()
			.from(this.table)
			.where(eq(this.table.short, short))
			.limit(1);
		return result.at(0);
	}
}
