import { gql } from "apollo-server";

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String
    shop: CoffeeShop!
    createdAt: String!
    updatedAt: String!
  }
  type CoffeeShop {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    photos: [CoffeeShopPhoto]
    name: String!
    latitude: String
    longitude: String
    categories: [Category]!
  }
  type Category {
    id: Int!
    name: String
    slug: String
    createdAt: String!
    updatedAt: String!
    shops: [CoffeeShop]
    totalShops: Int
  }
`;
