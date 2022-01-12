import { Lrud } from 'Lrud';
const navigation = new Lrud();

const tree = {
  lists: {},
  rows: {},
  cards: {}
};

const onEnter = () => {
  const node = navigation.currentFocusNode;
  const link = document.getElementById(node.id);
  link.querySelector('a').click();
};

export const registerNode = (id, type, parentId) => {
  const opts = { parent: parentId, isFocusable: true };
  switch (type) {
    case 'list':
      tree.lists[id] = { ...opts, orientation: 'vertical', isIndexAlign: true };
      break;
    case 'row':
      tree.rows[id] = { ...opts, orientation: 'horizontal' };
      break;
    case 'card':
      tree.cards[id] = { ...opts, onSelect: onEnter };
      break;
  }
  return id;
};

export const addPage = listId => {
  const opts = tree.lists[listId];
  navigation.registerNode(listId, opts);
  for (const [id, opts] of Object.entries(tree.rows)) {
    navigation.registerNode(id, opts);
  }
  for (const [id, opts] of Object.entries(tree.cards)) {
    navigation.registerNode(id, opts);
  }
};

export const initNavigation = () => {
  navigation.registerTree( {id: 'root', orientation: 'vertical',
    children: [
      { id: 'header', orientation: 'horizontal', isFocusable: true },
      { id: 'main', orientation: 'vertical', isFocusable: true }
    ]
  });
  const header = document.getElementById('header');
  const headerButtons = Array.from(header.querySelectorAll('button'));
  headerButtons.forEach(button => {
    console.info('>>> button.id', button.id);
    if (button.id) {
      navigation.registerNode(button.id,
        { orientation: 'horizontal', parent: 'header', isFocusable: true  }
      );
    }
  });

  navigation.on('focus', function (event) {
    const elem = document.getElementById(event?.id);
    elem?.focus();
  });
  navigation.assignFocus('home');
  document.onkeydown = function (event) {
    if ([27].indexOf(event.keyCode) > -1 ) {//event.key: "Escape"
      history.back();
    } else {
      navigation.handleKeyEvent(event, {forceFocus: true});
    }
    console.info('navigation.currentFocusNode?.id', navigation.currentFocusNode?.id);
  }
}

export default navigation;