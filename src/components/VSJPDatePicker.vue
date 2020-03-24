<template>
  <v-date-picker
    :allowedDates="allowedDates"
    :color="color"
    :dark="dark"
    :dayFormat="jpvDayFormat"
    :disabled="disabled"
    :eventColor="eventColor"
    :events="events"
    :firstDayOfWeek="firstDayOfWeek"
    :fullWidth="fullWidth"
    :headerColor="headerColor"
    :headerDateFormat="str => jpvHeaderDateFormat(str)"
    :landscape="landscape"
    :light="light"
    :max="max"
    :min="min"
    :monthFormat="str => jpvMonthFormat(str)"
    :multiple="multiple"
    :nextIcon="nextIcon"
    :noTitle="noTitle"
    :pickerDate="pickerDate"
    :prevIcon="prevIcon"
    :range="range"
    :reactive="reactive"
    :readonly="readonly"
    :scrollable="scrollable"
    :selectedItemsText="selectedItemsText"
    :showCurrent="pickerShowCurrent"
    :showWeek="showWeek"
    :title-date-format="jpvTitleDateFormat"
    :type="jpvType"
    :value="jpvValue"
    :width="width"
    :yearFormat="str => jpvYearFormat(str)"
    :yearIcon="yearIcon"
    @change="changeValue"
    @click:month="clickMonth"
    @click:date="clickDate"
    @update:picker-date="updatePickerDate"
    locale="ja-jp"
    ><slot></slot
  ></v-date-picker>
</template>
<script>
export default {
  props: {
    /* eslint-disable */
    allowedDates: Function,
    color: String,
    dark: Boolean,
    dayFormat: Function,
    disabled: Boolean,
    eventColor: [Array, Function, Object, String],
    events: [Array, Function, Object],
    firstDayOfWeek: [String, Number],
    fullWidth: Boolean,
    headerColor: String,
    landscape: Boolean,
    light: Boolean,
    max: String,
    min: {
      type: String,
      // 元号の明治時代まで
      default: "1868-01-01"
    },
    multiple: Boolean,
    nextIcon: String,
    noTitle: Boolean,
    pickerDate: String,
    prevIcon: String,
    range: Boolean,
    reactive: Boolean,
    readonly: Boolean,
    scrollable: Boolean,
    showCurrent: [Boolean, String],
    showWeek: [Boolean],
    selectedItemsText: String,
    type: {
      type: String,
      default: "date" // 'date' or 'month' or 'nendo'
    },
    value: [String, Array, Object],
    width: [Number, String],
    yearIcon: String
    /* eslint-disable */
  },
  data: () => {
    const now = new Date();
    return {
      inputValue: "",
      now: now
    };
  },
  computed: {
    pickerShowCurrent() {
      //picker値は元のまま変わらないのでpickerの位置を3か月ずらす
      if (!this.showCurrent) {
        //カレント表示をなくす場合
        return false;
      }
      let current = this.showCurrent;
      if (this.type === "nendo") {
        //初期状態でカレントがセットされていない場合、内部を現時刻から3か月前にセット
        if (current === true) {
          current =
            this.now.getFullYear() + "-" + parseInt(this.now.getMonth() + 1);
        }
        current = this.nendo2realYM(current);
      }
      return current;
    },
    lastValue() {
      return this.multiple || this.range
        ? this.inputValue[this.inputValue.length - 1]
        : this.inputValue;
    },
    jpvType() {
      return this.type === "nendo" ? "month" : this.type;
    },
    jpvDate() {
      if (
        typeof this.inputValue !== "string" ||
        !this.inputValue.match(/^(\d{4})/)
      )
        return "";

      const d = {};
      d.value = this.inputValue;
      let [year, month, day] = d.value.split("-");

      d.year = parseInt(year);
      d.month = month;
      d.day = day ? day : "";
      d.wareki = this.year2Wareki(d.year);

      d.WM = d.wareki + d.month + "月";
      d.WYM = d.wareki + "(" + d.year + "/" + d.month + ")";

      //表示用のデータ
      if (this.type === "date") {
        d.value = d.year + "-" + d.month + "-" + d.day;
        d.WMD = d.wareki + d.month + "月" + d.day + "日";
        d.WYMD = d.wareki + "(" + d.year + "/" + d.month + "/" + d.day + ")";
      } else if (this.type === "nendo") {
        d.nendo = {};
        d.nendo.year = d.month < 4 ? d.year - 1 : d.year;
        d.nendo.month = d.month;
        d.nendo.wareki = this.year2Wareki(d.nendo.year) + "度";
        d.nendo.WM = d.nendo.wareki + d.nendo.month + "月";
        d.nendo.WYM =
          d.nendo.wareki + "(" + d.nendo.year + "/" + d.nendo.month + ")";
      }
      return d;
    },
    jpvValue() {
      if (!this.inputValue) {
        return this.multiple || this.range ? [] : "";
      }
      let returnValue = this.inputValue;
      if (this.type === "nendo") {
        if (this.multiple || this.range) {
          returnValue = this.inputValue.map(str => {
            return str.match(/^(\d{4})-(\d{2})$/)
              ? this.nendo2realYM(str)
              : str;
          });
        } else {
          returnValue = this.nendo2realYM(this.inputValue);
        }
      }
      return returnValue;
    }
  },
  watch: {
    multiple: {
      handler(newVal) {
        this.inputValue = newVal ? [] : "";
        this.$emit("input", this.inputValue);
      }
    },
    range: {
      handler(newVal) {
        this.inputValue = newVal ? [] : "";
        this.$emit("input", this.inputValue);
      }
    },
    type: {
      handler() {
        //typeを切り替えるとv-date-pickerとの整合性が合わないので再設定する
        this.$children[0].tableDate = this.$children[0].inputDate;
      }
    }
  },
  created() {
    this.inputValue = this.value;
  },
  methods: {
    real2nendoM(realM) {
      // 内部/月 → 年度/月
      return realM < 10 ? realM + 3 : realM - 9;
    },
    real2nendoY(realY, realM) {
      // 内部/月 → 年度/年
      return realM < 10 ? realY : realY + 1;
    },
    real2nendoYM(realYM) {
      // 内部/年月 → 年度/年月
      if (!realYM) return "";
      const y = parseInt(realYM.split("-")[0]);
      const m = parseInt(realYM.split("-")[1]);
      return this.real2nendoY(y, m) + "-" + this.strpad(this.real2nendoM(m));
    },
    nendo2realM(nendoM) {
      // 年度/月 → 内部/月
      return nendoM < 4 ? nendoM + 9 : nendoM - 3;
    },
    nendo2realY(nendoY, nendoM) {
      // 年度/年月 → 内部/年
      return nendoM < 4 ? nendoY - 1 : nendoY;
    },
    nendo2realYM(nendoYM) {
      // 年度/年月 → 内部/年月
      if (!nendoYM) return "";
      const y = parseInt(nendoYM.split("-")[0]);
      const m = parseInt(nendoYM.split("-")[1]);
      return this.nendo2realY(y, m) + "-" + this.strpad(this.nendo2realM(m));
    },
    year2Wareki(year) {
      let wYear = "";
      let gen = "";
      if (year > 2018) {
        wYear = year - 2018;
        gen = "令和";
      } else if (year > 1988) {
        wYear = year - 1988;
        gen = "平成";
      } else if (year > 1925) {
        wYear = year - 1925;
        gen = "昭和";
      } else if (year > 1911) {
        wYear = year - 1911;
        gen = "大正";
      } else if (year > 1867) {
        wYear = year - 1867;
        gen = "明治";
      }
      if (wYear === 1) wYear = "元";
      return gen !== "" ? gen + wYear + "年" : false;
    },
    strpad(num) {
      return ("00" + num).slice(-2);
    },
    changeValue: function(str) {
      if (!str) return false;
      if (this.readonly) return false;
      if (this.type === "nendo") {
        str = this.real2nendoYM(str);
      }
      this.inputValue = str;
      this.$emit("change", this.jpvDate);
    },
    clickMonth: function(str) {
      if (this.readonly) return false;
      if (this.type === "nendo") {
        str = this.real2nendoYM(str);
      }
      if (this.type !== "date") {
        this.updateValue(str);
      }
      this.$emit("input", this.inputValue);
    },
    clickDate: function(str) {
      if (this.readonly) return false;
      this.updateValue(str);
      this.$emit("input", this.inputValue);
    },
    updateValue(str) {
      if (this.multiple) {
        const index = this.inputValue.indexOf(str);
        if (index > -1) {
          this.inputValue = this.inputValue.filter(n => n != str);
        } else {
          this.inputValue.push(str);
        }
      } else if (this.range) {
        if (this.inputValue.length > 1) {
          this.inputValue = [];
        }
        this.inputValue.push(str);
      }
    },
    updatePickerDate(str) {
      this.$emit("update:picker-date", str);
    },

    //ヘッダーの一番上にある年表示＋年選択のフォーマット
    jpvYearFormat(str) {
      if (!str) return "";
      const year = this.type === "date" ? str.split("-")[0] : str;
      return this.year2Wareki(year) + "(" + year + ")";
    },
    //ヘッダーの選択データを表示する部分
    jpvTitleDateFormat(str) {
      // realYM → YYYY-MM-DD
      if (!str) return "";
      return str.slice(0, 10);
      // return this.multiple || this.range
      //   ? String(this.inputValue.length) + " selected"
      //   : this.inputValue;
    },
    //月選択ボタン上部のYYYYを変換するfunction
    jpvHeaderDateFormat(str) {
      if (!str) return "";
      // const [year, month, day] = str.split("-");
      const [year, month] = str.split("-");
      if (this.type === "nendo") {
        return this.year2Wareki(year) + "度(" + year + ")";
      } else if (this.type === "date" && month) {
        //dateの場合でも月選択するケースがある
        return this.year2Wareki(year) + "(" + year + ")" + month + "月";
      } else {
        return this.year2Wareki(year) + "(" + year + ")";
      }
      // return str;
    },
    //月選択ボタンを年度の見た目にするfunction
    jpvMonthFormat(str) {
      // realYM → YYYY-MM
      if (str === "") return str;
      let m = parseInt(str.split("-")[1]);
      if (this.type === "nendo") m = this.real2nendoM(m);
      return m + "月";
    },
    //月選択ボタンを年度の見た目にするfunction
    jpvDayFormat(str) {
      // realYMD → YYYY-MM-DD
      if (str === "") return str;
      let d = parseInt(str.split("-")[2]);
      return d;
    }
  }
};
</script>
