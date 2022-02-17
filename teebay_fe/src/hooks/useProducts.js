import { useQuery, gql } from "@apollo/client"

const GET_All_PRODUCTS = gql`
 query Query {
  getAllProducts {
    id
    title
    description
    price
    category
    rent
    options
  }
}
`;
export const useProducts = () => {
  const { error, loading, data } = useQuery(GET_All_PRODUCTS)


  return {
    error, loading, data
  }
}