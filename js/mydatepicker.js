System.register(['angular2/core', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var MyDatePicker;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            MyDatePicker = (function () {
                function MyDatePicker() {
                    this.dateChanged = new core_1.EventEmitter();
                    this.showSelector = false;
                    this.visibleMonth = { monthTxt: '', monthNbr: 0, year: 0 };
                    this.selectedDate = { year: 0, month: 0, day: 0 };
                    this.weekDays = [];
                    this.dates = [];
                    this.selectionDayTxt = '';
                    this.dayIdx = 0;
                    this.PREV_MONTH = 1;
                    this.CURR_MONTH = 2;
                    this.NEXT_MONTH = 3;
                    this.dayLabels = { su: 'Sun', mo: 'Mon', tu: 'Tue', we: 'Wed', th: 'Thu', fr: 'Fri', sa: 'Sat' };
                    this.monthLabels = { 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' };
                    this.dateFormat = 'yyyy-mm-dd';
                    this.firstDayOfWeek = 'mo';
                    this.sunHighlight = true;
                    this.height = '34px';
                    this.width = '100%';
                    this.today = new Date();
                }
                MyDatePicker.prototype.ngOnInit = function () {
                    this.dayLabels = this.options.dayLabels !== undefined ? this.options.dayLabels : this.dayLabels;
                    this.monthLabels = this.options.monthLabels !== undefined ? this.options.monthLabels : this.monthLabels;
                    this.dateFormat = this.options.dateFormat !== undefined ? this.options.dateFormat : this.dateFormat;
                    this.firstDayOfWeek = this.options.firstDayOfWeek !== undefined ? this.options.firstDayOfWeek : this.firstDayOfWeek;
                    this.sunHighlight = this.options.sunHighlight !== undefined ? this.options.sunHighlight : this.sunHighlight;
                    this.height = this.options.height !== undefined ? this.options.height : this.height;
                    this.width = this.options.width !== undefined ? this.options.width : this.width;
                    var days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
                    this.dayIdx = days.indexOf(this.firstDayOfWeek);
                    if (this.dayIdx !== -1) {
                        var idx = this.dayIdx;
                        for (var i = 0; i < days.length; i++) {
                            this.weekDays.push(this.dayLabels[days[idx]]);
                            idx = days[idx] === 'sa' ? 0 : idx + 1;
                        }
                    }
                };
                MyDatePicker.prototype.removeBtnClicked = function () {
                    this.selectionDayTxt = '';
                    this.selectedDate = { year: 0, month: 0, day: 0 };
                    this.dateChanged.emit({ date: {}, formatted: this.selectionDayTxt, epoc: 0 });
                };
                MyDatePicker.prototype.openBtnClicked = function () {
                    this.showSelector = !this.showSelector;
                    if (this.showSelector) {
                        var y = 0, m = 0;
                        if (this.selectedDate.year === 0 && this.selectedDate.month === 0 && this.selectedDate.day === 0) {
                            y = this.today.getFullYear();
                            m = this.today.getMonth() + 1;
                        }
                        else {
                            y = this.selectedDate.year;
                            m = this.selectedDate.month;
                        }
                        this.visibleMonth = { monthTxt: this.monthLabels[m], monthNbr: m, year: y };
                        this.createMonth(m, y);
                    }
                };
                MyDatePicker.prototype.prevMonth = function () {
                    var m = this.visibleMonth.monthNbr;
                    var y = this.visibleMonth.year;
                    if (m === 1) {
                        m = 12;
                        y--;
                    }
                    else {
                        m--;
                    }
                    this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
                    this.createMonth(m, y);
                };
                MyDatePicker.prototype.nextMonth = function () {
                    var m = this.visibleMonth.monthNbr;
                    var y = this.visibleMonth.year;
                    if (m === 12) {
                        m = 1;
                        y++;
                    }
                    else {
                        m++;
                    }
                    this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: y };
                    this.createMonth(m, y);
                };
                MyDatePicker.prototype.prevYear = function () {
                    this.visibleMonth.year--;
                    this.createMonth(this.visibleMonth.monthNbr, this.visibleMonth.year);
                };
                MyDatePicker.prototype.nextYear = function () {
                    this.visibleMonth.year++;
                    this.createMonth(this.visibleMonth.monthNbr, this.visibleMonth.year);
                };
                MyDatePicker.prototype.todayClicked = function () {
                    var m = this.today.getMonth() + 1;
                    this.visibleMonth = { monthTxt: this.monthText(m), monthNbr: m, year: this.today.getFullYear() };
                    this.createMonth(this.visibleMonth.monthNbr, this.visibleMonth.year);
                };
                MyDatePicker.prototype.cellClicked = function (cell) {
                    if (cell.cmo === this.PREV_MONTH) {
                        this.prevMonth();
                    }
                    else if (cell.cmo === this.CURR_MONTH) {
                        this.selectedDate = { day: cell.day, month: cell.month, year: cell.year };
                        this.selectionDayTxt = this.formatDate(cell);
                        this.showSelector = false;
                        var epoc = new Date(cell.year, cell.month - 1, cell.day, 0, 0, 0, 0).getTime() / 1000.0;
                        this.dateChanged.emit({ date: this.selectedDate, formatted: this.selectionDayTxt, epoc: epoc });
                    }
                    else if (cell.cmo === this.NEXT_MONTH) {
                        this.nextMonth();
                    }
                };
                MyDatePicker.prototype.preZero = function (val) {
                    return val < 10 ? '0' + val : val;
                };
                MyDatePicker.prototype.formatDate = function (val) {
                    return this.dateFormat.replace('yyyy', val.year)
                        .replace('mm', this.preZero(val.month))
                        .replace('dd', this.preZero(val.day));
                };
                MyDatePicker.prototype.monthText = function (m) {
                    return this.monthLabels[m];
                };
                MyDatePicker.prototype.monthStartIdx = function (y, m) {
                    var d = new Date();
                    d.setDate(1);
                    d.setMonth(m - 1);
                    d.setFullYear(y);
                    var idx = d.getDay() + this.sundayIdx();
                    return idx >= 7 ? idx - 7 : idx;
                };
                MyDatePicker.prototype.daysInMonth = function (m, y) {
                    return new Date(y, m, 0).getDate();
                };
                MyDatePicker.prototype.daysInPrevMonth = function (m, y) {
                    if (m === 1) {
                        m = 12;
                        y--;
                    }
                    else {
                        m--;
                    }
                    return this.daysInMonth(m, y);
                };
                MyDatePicker.prototype.isCurrDay = function (d, m, y, cmo) {
                    return d === this.today.getDate() && m === this.today.getMonth() + 1 && y === this.today.getFullYear() && cmo === 2;
                };
                MyDatePicker.prototype.sundayIdx = function () {
                    return this.dayIdx > 0 ? 7 - this.dayIdx : 0;
                };
                MyDatePicker.prototype.createMonth = function (m, y) {
                    this.dates.length = 0;
                    var monthStart = this.monthStartIdx(y, m);
                    var dInThisM = this.daysInMonth(m, y);
                    var dInPrevM = this.daysInPrevMonth(m, y);
                    var sunIdx = this.sundayIdx();
                    var dayNbr = 1;
                    var cmo = this.PREV_MONTH;
                    for (var i = 1; i < 7; i++) {
                        var week = [];
                        if (i === 1) {
                            var pm = dInPrevM - monthStart + 1;
                            for (var j = pm; j <= dInPrevM; j++) {
                                week.push({
                                    day: j, month: m, year: y, cmo: cmo, currDay: this.isCurrDay(j, m, y, cmo), sun: week.length === sunIdx
                                });
                            }
                            cmo = this.CURR_MONTH;
                            var daysLeft = 7 - week.length;
                            for (var j = 0; j < daysLeft; j++) {
                                week.push({
                                    day: dayNbr, month: m, year: y, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), sun: week.length === sunIdx
                                });
                                dayNbr++;
                            }
                        }
                        else {
                            for (var j = 1; j < 8; j++) {
                                if (dayNbr > dInThisM) {
                                    dayNbr = 1;
                                    cmo = this.NEXT_MONTH;
                                }
                                week.push({
                                    day: dayNbr, month: m, year: y, cmo: cmo, currDay: this.isCurrDay(dayNbr, m, y, cmo), sun: week.length === sunIdx
                                });
                                dayNbr++;
                            }
                        }
                        this.dates.push(week);
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], MyDatePicker.prototype, "options", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MyDatePicker.prototype, "dateChanged", void 0);
                MyDatePicker = __decorate([
                    core_1.Component({
                        selector: 'my-date-picker'
                    }),
                    core_1.View({
                        templateUrl: 'app/template/mydatepicker.html',
                        styleUrls: ['app/css/mydatepicker.css'],
                        directives: [common_1.NgIf, common_1.NgFor, common_1.NgClass, common_1.NgStyle]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MyDatePicker);
                return MyDatePicker;
            })();
            exports_1("MyDatePicker", MyDatePicker);
        }
    }
});
//# sourceMappingURL=mydatepicker.js.map