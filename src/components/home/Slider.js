import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Button } from "@material-ui/core";
import CardOutlined from './CardOutlined'
import Card from './Card'
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  cardWrapper: {
    paddingTop:'3rem',
    '& .slick-active':{
      padding:"2rem"
    },
    [theme.breakpoints.down('xs')]: {
      width:'40vw'
    }
  },
});

class PreviousNextMethods extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };

    const { classes } = this.props;

    return (
      <div style={{display:'grid',
        gridTemplateAreas:`"cards buttons"`,
        gridTemplateColumns:'4fr 1fr'}}>
        <div style={{width:'90vw'}}>
          {/* <Grid container spacing={10}> */}
            <Slider ref={c => (this.slider = c)} {...settings}>
              {this.props.cards.map((val,i)=>{
                return <div className={classes.cardWrapper}>
                  {this.props.outlined?
                    <CardOutlined key={i} val={val}/>:
                    <Card key={i} val={val}/>
                    }
                  </div>
              })}
            </Slider>
          {/* </Grid> */}
        </div>
        <div  style={{ textAlign: "center",gridArea:'buttons',position:'relative',top:'-10%',right:'100%' }}>
          <div style={{display:'flex'}}>
            <Button className="arrow-btn prev"  onClick={this.previous}>
              <ArrowBackIcon/>
            </Button>
            <Button className="button" onClick={this.next}>
              <ArrowForwardIcon/>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PreviousNextMethods);