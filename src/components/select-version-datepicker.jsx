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
  render () {
    // const value = this.props.value ? this.props.value.uuid : '';
    const versions = this.props.versions;
    const handleChange = event => {
      const newValue = timestampsAndHashes[event];
      console.log(timestampsAndHashes[event]);
      this.props.onChange(versions.find(v => v.uuid === newValue));
    };

    // const options = versions.map(version => {
    //   return (
    //     <option key={version.uuid} value={version.uuid}>
    //       {dateFormatter.format(version.capture_time)}
    //     </option>
    //   );
    // });

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
    this.state.capture_times = capture_times;
    return (
      <div>
        <link rel="stylesheet" type="text/css" href={Style1}/>
        <DatePicker includeDates = {capture_times} onChange={handleChange} value={capture_times[0].toString()}/>

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
