import ItemDay from "./ItemDay";
import { DateUtil } from "./DateUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DatePicker extends cc.Component {

    @property({
        type:cc.Label,
        displayName:'年月'
    })
    timeTitle:cc.Label = null

    @property({
        type:cc.Node,
        displayName:'日期容器'
    })
    daysContainer:cc.Node = null

    @property({
        type:cc.Prefab,
        displayName:'日期预设'
    })
    daysPrefab:cc.Node = null

    date;
    year;
    month;
    day;
    dayList = []
    callback;
    



    start () {
        // this.updateDate()
    }

     // 设置显示的日志，默认为当前日期
     setDate(year, month, day) {
        //传入的时间
        this.date = new Date(year, month - 1, day);
        //最小时间
        console.log();
        
        if(this.date < DateUtil.getEarliestDate()){
            this.date = DateUtil.getEarliestDate()
        }
        
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
        
        this.updateDate();
    }

    updateDate () {
        
        //上个月的时间
        let last = DateUtil.getLastMonthDays(this.year,this.month)
        //下个月的时间
        let next = DateUtil.getNextMonthDays(this.year,this.month)
        //当前的时间
        let current = DateUtil.getDaysInOneMonth(this.year,this.month)
        
        this.daysContainer.removeAllChildren()
        let currentDays = []

        //上月待补全天数
        for (let index = 0; index < last.length; index++) {
            let element:any = {}
            element.day = last[index]
            element.isCurrent = false
            currentDays.push(element)
        }
        //当月天数
        for (let i = 0; i < current; i++) {
            let element:any = {}
            element.day = i + 1
            element.isCurrent = true
            currentDays.push(element)
        }
        //下月待补全天数
        for (let index = 0; index < next.length; index++) {
            let element:any = {}
            element.day = next[index]
            element.isCurrent = false
            currentDays.push(element)
        }

        for (let i = 0; i < currentDays.length; i++) {
            let node = cc.instantiate(this.daysPrefab);
            let script:ItemDay = node.getComponent(ItemDay);
            script.setDay(i,currentDays[i],this.day === currentDays[i].day,this.selectCallback.bind(this))
            node.parent = this.daysContainer;
        }
        this.timeTitle.string = cc.js.formatStr("%s年%s月", this.year, this.month + 1);
    }

    /**
     * 选择时间
     * @param selIndex 
     * @param selDay 
     */
    selectCallback(selIndex, selDay){
        this.day = selDay;
        if (this.callback) {
            this.callback(this.year, this.month, this.day);
        }
        this.node.active = false
    }


    /**
     * 跳转到上个月
     */
    lastMonth () {
        if (this.month > 0) {
            this.month -= 1;
        } else {
            this.month = 11;
            this.year -= 1;
        }
        if(this.year < 1970){
            this.year = 1970
            this.month = 0
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();
        
    }

    /**
     * 跳转到下一个月
     */
    nextMonth () {
        if (this.month < 11) {
            this.month += 1;
        } else {
            this.month = 0;
            this.year += 1;
        }
        this.date.setFullYear(this.year);
        this.date.setMonth(this.month);
        this.updateDate();
    }

    /**
     * 跳转到上一年
     */
    lastYear(){
        this.year -= 1
        if(this.year < 1970){
            this.year = 1970
            this.month = 0
        }
        this.date.setFullYear(this.year)
        this.updateDate()
    }

    /**
     * 跳转到下一年
     */
    nextYear(){
        this.year += 1
        this.date.setFullYear(this.year)
        this.updateDate()
    }

    // 设置选中日期之后的回调
    setPickDateCallback(cb) {
        this.callback = cb;
    }

    onClickClose () {
        if (this.callback) {
            this.callback(this.year, this.month, this.day);
        }
        this.node.parent = null;
    }
}
