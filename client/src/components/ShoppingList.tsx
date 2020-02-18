import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../flux/actions/itemActions';
import { IItemReduxProps, IShoppingList } from '../types/interfaces';

const ShoppingList = ({
  getItems,
  item,
  isAuthenticated,
  deleteItem
}: IShoppingList) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const { items } = item;
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(_id)}
                  >
                    &times;
                  </Button>
                ) : null}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
