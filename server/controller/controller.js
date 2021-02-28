const {ContactDB} = require('../model/model');

// create and save new contact
exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    const name = req.body.name;
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    // new contact
    const contact = new ContactDB({
        name: nameCapitalized,
        email: req.body.email,
        phoneno: req.body.phoneno,
    });

    // save contact in the database
    contact
        .save(contact)
        .then(data => {
            //res.send(data)
            res.redirect('/add-contact');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all contacts/ retrieve and return a single contact
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        ContactDB.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({message: "Not found contact with id " + id})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message: "Error retrieving contact with id " + id})
            })

    } else {
        ContactDB.find().sort({name: 1}).then(contact => {
            res.send(contact)
        })
            .catch(err => {
                res.status(500).send({message: err.message || "Error Occurred while retrieving contact information"})
            })
    }


}

// Update a new identified contact by id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({message: "Data to update can not be empty"})
    }

    const id = req.params.id;
    ContactDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({message: `Cannot Update contact with ${id}. Maybe contact not found!`})
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error Update contact information"})
        })
}

// Delete a contact with specified contact id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ContactDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({message: `Cannot Delete with id ${id}. Maybe id is wrong`})
            } else {
                res.send({
                    message: "Contact was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete contact with id=" + id
            });
        });
}