# Cocos 时间选择器
setTimePicker(){

​    let node = cc.instantiate(this.datePicker)

​    node.parent = this.node

​    let datePicker:DatePicker = node.getComponent("DatePicker")

​    datePicker.setDate(this.year, this.month, this.day)

​    datePicker.setPickDateCallback((year, month, day)=>{

​      this.year = year

​      this.month = month

​      this.day = day

​    });

  }

![TimePicker](https://github.com/onlyYU/cocos-date-picker/blob/master/TimePicker.png)
