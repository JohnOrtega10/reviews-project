export const filtersInitialState = {
  query: '',
  author: [],
  category: [],
  order: 'MR'
};

export const ACTIONS = {
  SET_QUERY: 'set_query',
  SET_AUTHOR: 'set_author',
  SET_CATEGORY: 'set_category',
  SET_ORDER: 'set_order'
};

export function filtersReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_QUERY:
      return { ...state, query: action.payload };

    case ACTIONS.SET_AUTHOR:
      if (state.author.includes(action.payload)) {
        const newList = state.author.filter((id) => id !== action.payload);
        return { ...state, author: newList };
      }
      return { ...state, author: [...state.author, action.payload] };

    case ACTIONS.SET_CATEGORY:
      if (state.category.includes(action.payload)) {
        const newList = state.category.filter((id) => id !== action.payload);
        return { ...state, category: newList };
      }
      return { ...state, category: [...state.category, action.payload] };

    case ACTIONS.SET_ORDER:
      return { ...state, order: action.payload };

    default:
      return state;
  }
}
