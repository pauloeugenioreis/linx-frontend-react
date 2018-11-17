import React, {Component} from 'react';
import Slider from 'react-slick';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function OldPrice(props) {
    if (props.price === null) {
        return null;
    }
    return (
        <span className="oldPrice"> De: <strong>{props.price}</strong></span>
    );
}

function Produto(props) {
    return (
        <div className="vitrineProdutos">
            <a className="link" title={props.item.name} href={props.item.detailUrl}>
                                    <span>
                                        <img src={props.item.imageName} alt={props.name}></img>
                                    </span>
                <strong>{props.item.name}</strong>
                <div className="produtoDetalhe">
                    <OldPrice price={props.item.oldPrice}/>
                    <span className="price"> Por: {props.item.price}</span>
                    <span className="paymentConditions"
                          dangerouslySetInnerHTML={{__html: props.item.productInfo.paymentConditions}}/>
                </div>
            </a>
        </div>
    );
}

class AppVitrine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch(this.props.api)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, items} = this.state;

        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
        };

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Carregando...</div>;
        } else {
            return (
                <div>
                    <div id="containerReference">
                        <div>Produto Visualizado</div>
                        <Produto item={items.reference.item} key={items.reference.item.businessId}/>
                    </div>
                    <div id="containerRecommendation">
                        <div>Produtos recomendados</div>
                        <div id="recommendation">
                            <Slider {...settings}>
                                {items.recommendation.map(item => (
                                    <Produto item={item} key={item.businessId}/>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default AppVitrine;
