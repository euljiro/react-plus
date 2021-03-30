import React from "react";
import _ from "lodash"; // lodash 부르기

const Search = () => {
    const debounce = _.debounce((k) => console.log("디바운스! :::", k), 1000);
    const keyPress = React.useCallback(debounce, []);

    const onChange = (e) => {
        keyPress(e.target.value);
    };

    //   const throttle = _.throttle((k) => console.log("쓰로틀! :::", k), 1000);
    //   const keyPress = React.useCallback(throttle, []);

    return (
        <div>
            <label>Search:</label>
            <input onChange={onChange} />
        </div>
    );
};

export default Search;
