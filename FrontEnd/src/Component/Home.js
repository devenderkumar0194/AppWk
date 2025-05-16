import MyHead from './MyHead';
import ProductList from './Product/List';

const Home = () => {
    return <>
        <MyHead heading="My Front End Test" desc="Resize this responsive page to see the effect!" />
        <ProductList/> 
        </>;
}

export default Home;