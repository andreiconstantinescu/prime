import { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLUnionType } from 'graphql';

export const createDemo = () => {
  const DemoFoo = new GraphQLObjectType({
    name: 'DemoFoo',
    fields: {
      foo: { type: GraphQLString },
    },
  });

  const DemoBar = new GraphQLObjectType({
    name: 'DemoBar',
    fields: {
      bar: { type: GraphQLString },
    },
  });

  const DemoUnion = new GraphQLUnionType({
    name: 'DemoUnion',
    types: [DemoFoo, DemoBar],
    resolveType(value) {
      return value.__typename;
    },
  });

  const DemoType = new GraphQLObjectType({
    name: 'Demo',
    fields: {
      yo: { type: GraphQLString },
      lo: { type: new GraphQLList(DemoUnion) },
    },
  });

  return {
    type: DemoType,
    resolve() {
      return {
        yo: 'bleh',
        lo: [
          {
            __typename: 'DemoFoo',
            foo: 'blurgh',
          },
          {
            __typename: 'DemoBar',
            bar: 'twizler',
          },
        ],
      };
    },
  };
};
