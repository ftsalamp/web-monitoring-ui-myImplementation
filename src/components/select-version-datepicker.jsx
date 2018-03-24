import React from 'react';
import {dateFormatter} from '../scripts/formatters';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Style1 from '../../node_modules/react-datepicker/dist/react-datepicker.css';

/**
 * A DatePicker listing page versions
 *
 * @class SelectVersionDatePicker
 * @extends {React.PureComponent}
 * @param {Object} props
 * @param {Version} [props.value] The currently selected version
 * @param {Version[]} props.versions The list of versions to display
 * @param {Version} props.onChange Callback for new selection. `Version => void`
 */
export default class SelectVersionDatePicker extends DatePicker {
  constuctor() {
    this.setState = this.setState.bind(this);
  }
  render () {
    const versions = this.props.versions;
    const handleChange = event => {
      const newValue = timestampsAndHashes[event];
      console.log(timestampsAndHashes[event]);
      this.props.onChange(versions.find(v => v.uuid === newValue));
      this.state.valueToShow = event.toString();
      this.state.selectedDate = event;
    };

    var timestampsAndHashes = {};
    var capture_times = [];
    for (var i = 0; i < versions.length; i++) {

      var date = versions[i].capture_time.getDate();
      var month = versions[i].capture_time.getMonth();
      var year = versions[i].capture_time.getFullYear();

      var thisMoment = moment().date(date).year(year).month(month).hour(0).minute(0).second(0);

      capture_times.push(thisMoment);
      timestampsAndHashes[thisMoment] = versions[i].uuid;
    }
    // this.state.valueToShow = capture_times[0].toString();
    // console.log('This is to be displayed: ' + this.state.valueToShow);
    // this.state.capture_times = capture_times;
    return (
      <div>
        <link rel="stylesheet" type="text/css" href={Style1}/>
        <DatePicker includeDates = {capture_times} onChange={handleChange}
          value={this.state.valueToShow} selected={this.state.selectedDate}/>

      </div>
    );

    // return (
    //   <select onChange={handleChange} value={value}>
    //     <option value="">none</option>
    //     {options}
    //   </select>
    // );
  }
}
