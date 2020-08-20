
export class DateUtil {


    static getDaysInOneMonth(year, month) {
        month =  month + 1
        if(month == 12){
            month = 0
        }
        
        var d = new Date(year, month, 0);
        return d.getDate();
    }

    static getDate(year,month){
        let days = []
        var d = new Date(year, month, 0);
        for (let i = 0; i < d.getDate(); i++) {
            const element = i;
            days.push(i + 1)
        }
        return 
    }

    static getLastMonthDays(year,month){
        let lastMonth = month - 1
        let lastDays = this.getDaysInOneMonth(year,lastMonth)
        let start = this.getWeekDay(year,month,0)
        
        let lastMonthDays = []
        for (let index = start; index > 0; index--) {
            const element = lastDays + 1 - index;
            lastMonthDays.push(element)
        }

        if(lastMonthDays.length == 7){
            return []
        }
        return lastMonthDays
    }

    static getNextMonthDays(year,month){
        let nextMonth = month + 1
        let end = this.getWeekDay(year,nextMonth,0)
        let nextMonthDays = []
        for (let index = 1; index <= 7 - end; index++) {
            const element = index;
            nextMonthDays.push(element)
        }
        return nextMonthDays
    }


    static getWeekDay(year,month,day){
        let date = new Date()
        date.setFullYear(year,month,day)
        let week = date.getDay()
        return week + 1
    }

    static getEarliestDate(){
        let earliestDate = '1970-01-01'
        let date = new Date(Date.parse(earliestDate));
        console.log('最早时间>>>',date);
        
        return date
    }

}
