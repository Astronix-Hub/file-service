import { GraphQLJSON } from 'graphql-scalars';
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class DemoResolver {
  @Query(() => GraphQLJSON)
  async demo() {
    return { hello: 'world' };
  }
}
