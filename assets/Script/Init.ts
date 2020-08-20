// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DatePicker from "./DatePicker";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({
        type:cc.Label,
        displayName:'显示的时间'
    })
    label: cc.Label = null;

    @property({
        type:cc.Prefab,
        displayName:'显示的时间'
    })
    datePicker: cc.Prefab = null;

    year;
    month;
    day;

    start () {

    }

    onLoad () {
        let date = new Date();
        this.year = date.getFullYear() - 999
        this.month = date.getMonth() - 1
        this.day = date.getDate()

        this.updateDate()
    }

    onClickDate() {
        let node = cc.instantiate(this.datePicker)
        node.parent = this.node
        let datePicker:DatePicker = node.getComponent("DatePicker")
        datePicker.setDate(this.year, this.month, this.day)
        datePicker.setPickDateCallback((year, month, day)=>{
            this.year = year
            this.month = month
            this.day = day
            this.updateDate()
        });
    }

    updateDate () {
        this.label.string = cc.js.formatStr("%s-%s-%s", this.year, this.month + 1, this.day);
    }

    // update (dt) {}
}
