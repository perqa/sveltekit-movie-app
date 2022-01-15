import { Lrud } from 'Lrud';
const navigation = new Lrud();

const tree = {
  lists: {},
  rows: {},
  cards: {}
};

const registered = {};
let activeView;
const lastFocus = {};

export const activate = id => {
  console.info('[keyNavigation] activate', id, !!document.getElementById(id));
  if (registered.inited && id && registered[id]) {
    navigation.moveNode(id, 'container');
    activeView = id;
    try {
      if (lastFocus[activeView]) {
        focus(lastFocus[activeView]);
      }
    } catch(e) {
      console.error('[keyNavigation] activate', e, id);
    }
  }
};

export const deactivate = id => {
  console.info('[keyNavigation] deactivate', id);
  if (registered.inited && id && registered[id]) {
    navigation.moveNode(id, 'root');
  }
};

export const focus = id => {
  navigation.assignFocus(id);
  reFocus();
}

// export const override = () => {
//   navigation.registerOverride(
//     'main',   // the ID to trigger the override on
//     'media',   // the ID of the node we want to focus on
//     'down'     // the direction of travel in order for the override to trigger
//   );
// };

const onEnter = () => {
  const node = navigation.currentFocusNode;
  if (node) {
    const elem = document.getElementById(node.id);
    if (elem) {
      elem.querySelector('a').click();
    }
  }
};

export const reFocus = () => {
  const node = navigation.currentFocusNode;
  if (node) {
    const elem = document.getElementById(node.id);
    if (elem) {
      const pre = document.activateElement;
      elem.focus();
      console.info('Active element pre, post', document.activateElement, pre, elem);
    }
  }
};


export const registerNode = (id, type, parentId) => {
  if (registered[id]) return id; //
  const opts = { parent: parentId, isFocusable: true, type: type };
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
  if (!registered.inited || registered[listId]) return;
  const opts = tree.lists[listId];
  if (listId && opts) {
    navigation.registerNode(listId, opts);
    registered[listId] = true;
    delete tree.lists[listId];
  }
  try {
    for (const [id, opts] of Object.entries(tree.rows)) {
      navigation.registerNode(id, opts);
      registered[id] = true;
    }
  } catch(e) {
    console.error('[keyNavigation] Row', e, tree.rows);
  } finally {
    tree.rows = {};
  }
  try {
    for (const [id, opts] of Object.entries(tree.cards)) {
      navigation.registerNode(id, opts);
      registered[id] = true;
    }
  } catch(e) {
    console.error('[keyNavigation] Card', e, tree.cards);
  } finally {
    tree.cards = {};
  }
};

export const initNavigation = () => {
  if (registered.inited) return;
  navigation.registerTree(
    {id: 'root', isFocusable: false, children: [
      {id: 'container', orientation: 'vertical', isFocusable: false, children: [
        // Active views: children of 'container'
        { id: 'header', orientation: 'horizontal', isFocusable: true }
      ]},
      // Inactive views: children of 'root'
      { id: 'movie-media', orientation: 'vertical', isFocusable: true, children: [
        { id: 'movie-play', isFocusable: true, onSelect: onEnter }
      ]},
      { id: 'tv-media', orientation: 'vertical', isFocusable: true, children: [
        { id: 'tv-play', isFocusable: true, onSelect: onEnter }
      ]}
    ]}
  );

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
    const id = event?.id;
    if (id) {
      const elem = document.getElementById(id);
      elem?.focus();
    }
  });
  navigation.on('select', function (event) {
    const id = event?.id;
    if (id) {
      const elem = document.getElementById(id);
      elem?.click();
      if (activeView && navigation.nodes[activeView]?.activeChild?.id === event?.parent?.id) {
        lastFocus[activeView] = id;
      }
    }
  });
  navigation.assignFocus('button-home');
  document.onkeydown = function (event) {
    if ([27].indexOf(event.keyCode) > -1 ) {//event.key: "Escape"
      const elem = document.getElementById('close-trailer');
      if (elem) {
        elem.click();
      } else {
        history.back();
      }
    } else {
      navigation.handleKeyEvent(event, {forceFocus: true});
    }
    console.info('navigation.currentFocusNode?.id', navigation.currentFocusNode?.id);
  }

  document.body.removeAttribute('tabindex');

  activeView = 'movie-list';
  registered.inited = true;
  registered['movie-media'] = true;
  registered['tv-media'] = true;
}

/*
 * DEBUG helper
 */
declare global {
    interface Window { NAV: any; }
}
if (typeof window !== "undefined") {
  window.NAV = {};
  window.NAV.nav = navigation;
  window.NAV.reg = registered;
  window.NAV.last = lastFocus;
}
/*
 * END DEBUG helper
 */

export default navigation;