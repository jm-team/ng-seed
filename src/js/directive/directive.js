/**
 * Created by Administrator on 2016/7/4 0004.
 */
import app from "app";
app.directive('datePick', [() => {
  return {
    restrict: 'AE',
  //  require: ['ngModel'],
    scope: {},
    link: function(scope, element, attrs, ctrls) {
      console.log()
    }
  }
}]).service('datePickService', [function() {
  let days = ['日', '一', '二', '三', '四', '五', '六'];
  let dates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let currentDate = 0;
  let sTh = '';

  days.forEach((value) => {
    sTh += '<th>'+(value)+'</th>';
  })
  let html = '<div class="date"><table><thead><tr>'+sTh+'</tr></thead>';

  function getMonthLastDate(year, month) {
    return (month === 2) ? ((year % 4) ? 28 : 29) : dates[month - 1];
  }

  function createTable(arr) {
    for (let i = 0, length = arr.length; i < length; i++) {
      let item = arr[i];

      if (!(i % 7)) {
        html += '<tr>'
      }

      if (item.currentDate) {
        html += ('<td class="current" data-year="'+(item.currentYear)+'" data-month="'+(item.currentMonth)+'" data-date="'+(item.date)+'">' + item.num + '</td>');
      } else {
        html += ('<td>' + item.num + '</td>');
      }

      if (i % 7 === 6) {
        html += '</tr>'
      }
    }

    angular.element(document.body).append(html)
  }

  this.createDatePick = function(dateTime) {
    // 获取时间日期
    let now = new Date(dateTime) || new Date();
    let fulleYear = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = currentDate = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let second = now.getSeconds();
    let day = now.getDay();
    console.log(day)
    let firstDay = new Date(fulleYear + '/' + month + '/' + 1).getDay();
    let lastDate = getMonthLastDate(fulleYear, month);
    let lastDay = new Date(fulleYear + '/' + month + '/' + lastDate).getDay();

    // 上月
    let prvMonth = new Date(fulleYear + '/' + (month - 1) + '/1');
    let prvMonthLastDate = getMonthLastDate(fulleYear, month - 1);
    // 下月
    let nextMonth = new Date(fulleYear + '/' + (month + 1) + '/1');
    let nextMonthLastDate = getMonthLastDate(fulleYear, month + 1);

    let piukdays = [];
    // 提取上一个月 要在这个月显示的天数
    for (let i = 0; i < firstDay; i++) {
      piukdays.unshift({ num: prvMonthLastDate--, currentMonth: prvMonth.getMonth() + 1, currentYear: prvMonth.getFullYear() })
    }

    for (let i = 1; i <= lastDate; i++) {
      if (i === date) {
        piukdays.push({ num: i, currentDate: true, currentMonth: month, currentYear: fulleYear });
      } else {
        piukdays.push({ num: i, currentMonth: month, currentYear: fulleYear });
      }
    }

    // 提取上一个月 要在这个月显示的天数
    for (let i = 0; i < (6 - lastDay); i++) {
      piukdays.push({ num: i + 1, month: nextMonth.getMonth() + 1, currentYear: nextMonth.getFullYear() })
    }
    createTable(piukdays, lastDay);
  };

  this.init = function(config) {
    this.config = config || {};
  };
}]);
