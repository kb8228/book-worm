import React, { useSelector } from 'react';
import { createSelector } from 'reselect'
import memoize from 'memoize-one';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, areEqual } from 'react-window';

const selectResult = createSelector(state => state.result)

const ResultsList = () => {
  const result = useSelector(selectResult);

  if (!result) { return null; }
  if (!result.docs.length) { return <div>No books found :(</div>; }

  const { docs } = result;
  const createItemData = memoize((items) => ({ items }));
  const itemData = createItemData(docs);

  const row = React.memo((props) => {
    const book = props.data.items[props.index]
    return (
      <ListItem button style={props.style} key={props.index}>
        <ListItemText primary={`${book.title}, by ${book.author_name || "author unknown"}`} />
      </ListItem>
    );
  }, areEqual);

  return (
    <FixedSizeList itemData={itemData} height={400} width={"100%"} itemSize={46} itemCount={docs.length}>
      { row }
    </FixedSizeList>
  );
}

export default ResultsList;
