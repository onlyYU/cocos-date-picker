// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ItemDay extends cc.Component {

    @property({
        type:cc.Label,
        displayName:'日期'
    })
    lbDay: cc.Label = null;

    @property({
        type:cc.Sprite,
        displayName:'选中的日期'
    })
    spSel: cc.Sprite = null;

    @property({
        type:cc.Sprite,
        displayName:'非本月日期'
    })
    otherMonth: cc.Sprite = null;

    index;//默认选中的
    day;
    callback;
    isCurrent;

    setDay(index, dayBean, sel, cb) {
        
        this.index = index;
        this.day = dayBean.day;
        this.callback = cb;
        this.isCurrent = dayBean.isCurrent

        if(dayBean.isCurrent){
            this.otherMonth.node.active = false
        }else{
            this.otherMonth.node.active = true
        }
        this.lbDay.string = dayBean.day;
        this.spSel.enabled = sel;
    }

    onClickItem() {
        
        if (this.callback&&this.isCurrent) {
            console.log('点击了');
            this.callback(this.index, this.day);
        }
    }
}
