import React, { useDispatch, useSelector } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const SearchTabs = () => {
  const currentTab = useSelector(state => state.currentTab);
  const dispatch = useDispatch();

  const setTab = (e, newTab) => {
    dispatch({ type: TYPES.SET_TAB, payload: newTab });
  }

  return (
    <Tabs
      value={["title", "author"]}
      onChange={setTab}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      aria-label="full width tabs example"
    >
      <Tab label="Title" {...tabProps(0)} />
      <Tab label="Author" {...tabProps(1)} />
    </Tabs>
  );
}

export default SearchTabs;
