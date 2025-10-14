/*props:
`name` (nome do produto), `price` (preço)  
`image` (URL da imagem)  
E use dentro de um `ProductList`
 para renderizar vários produtos.
*/
function ProductCard({ name, price, image }) {
    return (
        <>
            <h2>{name}</h2>
            <h3>R$ {price}</h3>
            <img src={image} alt={name} />
        </>
    );
}
export default ProductCard;