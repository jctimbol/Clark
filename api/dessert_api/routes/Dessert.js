const express = require('express');
const router = express.Router();
const Dessert = require('../models/Dessert');
const { decodeToken } = require('../util/token-functions.js');
const membershipState = require('../../util/constants').MEMBERSHIP_STATE;

const {
    OK,
    BAD_REQUEST,
    NOT_FOUND,
    FORBIDDEN,
    UNAUTHORIZED
} = require('../../util/constants').STATUS_CODES;

/* `GET /Dessert/getDesserts`
parameters
*Takes no parameters*
returns
*all deserts in an array, empty array if none* 
*/
router.get('/getDesserts',  (req, res) => {
    Dessert.find()
        .then(items => res.status(OK).send(items))
        .catch(error => {
            res.sendStatus(BAD_REQUEST);
        });
});

/*`POST /Dessert/createDessert`
parameters
*Dessert title*
*Dessert description*
*Dessert rating*
*requires the user's token to be sent in for authentication*
NOTE: the description and rating can be null since the schema doesn't require them!

returns
*200 if the dessert was created*
*401 if the token does not have correct permissions*
*403 if the token was not sent with the request*
*/
router.post('/createDessert', async (req, res) => {
    const decoded = await decodeToken(req);
    if (!decoded.token) {
        return res.sendStatus(FORBIDDEN);
    }
    if (decoded.token.accessLevel < membershipState.OFFICER) {
    if (req.body._id && req.body._id !== decoded.token._id) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'you must be an officer or admin to create desserts' });
    }
  }

    const {description, rating} = req.body;
    const numberSent = !Number.isNaN(Number(rating));

    const newEvent = new Dessert({
        title: req.body.title,
        description: description ? description : null,
        rating: numberSent ? Number(rating) : null
    });
    
    Dessert.create(newEvent, (error, post) => {
        if(error) return res.sendStatus(BAD_REQUEST);
        else return res.json(post);
    });
});

/*`POST /Dessert/editDessert`
parameters
*Dessert MongoDB ID*
*Dessert title*
*Dessert description*
*Dessert rating*
*requires the user's token to be sent in for authentication*


NOTE: the title, description and rating can be null since we are only updating values!

returns
*200 if the dessert was updated*
*401 if the token does not have correct permissions*
*403 if the token was not sent with the request*
*/
router.post('/editDessert', async (req, res) => {
    const decoded = await decodeToken(req);
    if (!decoded.token) {
        return res.sendStatus(FORBIDDEN);
    }
    if (decoded.token.accessLevel < membershipState.OFFICER) {
    if (req.body._id && req.body._id !== decoded.token._id) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'you must be an officer or admin to edit desserts' });
    }
  }
    const {_id, title, description, rating} = req.body;
    Dessert.findOne({_id})
        .then(Dessert => {
            Dessert.title = title || Dessert.title;
            Dessert.description = description || Dessert.description;
            Dessert.rating = rating || Dessert.rating;
            Dessert.save().then(() => {
                res.sendStatus(OK);
            })
            .catch(() => {
                res.sendStatus(BAD_REQUEST);
            });
        })
        .catch(() => {
            res.sendStatus(NOT_FOUND);
        });
});

/*`DELETE /Dessert/deleteDessert`
parameters
*Dessert MongoDB ID*
*requires the user's token to be sent in for authentication*

returns
*returns 200 if the dessert was deleted*
*401 if the token does not have correct permissions*
*403 if the token was not sent with the request*
*/
router.post('/deleteDessert', async (req, res) => {
    const decoded = await decodeToken(req);
    if (!decoded.token) {
        return res.sendStatus(FORBIDDEN);
    }
    if (decoded.token.accessLevel < membershipState.OFFICER) {
    if (req.body._id && req.body._id !== decoded.token._id) {
      return res
        .status(UNAUTHORIZED)
        .json({ message: 'you must be an officer or admin to delete desserts' });
    }
  }
    Dessert.deleteOne({_id: req.body._id})
        .then(result => {
            if(result.n < 1) res.sendStatus(NOT_FOUND);
            else res.sendStatus(OK);
        })
        .catch(() => {
            res.sendStatus(BAD_REQUEST);
        });
});

module.exports = router;