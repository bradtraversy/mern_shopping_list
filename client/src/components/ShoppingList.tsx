import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from '../flux/actions/itemActions';
import { IExistingItem, IItemReduxProps, IShoppingList } from '../types/interfaces';

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

  const handleEdit = (item: IExistingItem) => {
    editItem(item);
  }

  const { items } = item;
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map((item) => (
            <CSSTransition key={item._id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated ? (
                  <div>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      &times;
                    </Button>
                    <Button 
                      className="ml-2 mr-2"
                      color="info"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                  </div>
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
