import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './buildControl/BuildControl';

const BuildControls = (props) => {
  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
  ]

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <b>{props.price.toFixed(2)} $</b></p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]} />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>Order Now</button>
    </div>
  )
}

export default BuildControls;