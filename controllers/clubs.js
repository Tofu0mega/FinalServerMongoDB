import Clubs from '../models/club.js';


// Get all clubs
export async function getclubs(req, res) {
    try {
        console.log(req.user)
        const clubs = await Clubs.find();
        res.status(200).json(clubs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Get a single clubs by ID
export async function getclubsById(req, res) {
    try {
        const clubs = await Clubs.findById(req.params.clubId);
        if (!clubs) {
            return res.status(404).json({ error: 'clubs not found' });
        }
        res.status(200).json(clubs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Create a new clubs
export async function createclubs(req, res) {
    try {
        const clubs = new clubs({
            name: req.body.name,
            Acronym: req.body.Acronym,
            Department:req.body.Department,
            College:req.body.College,
            email: req.body.email,
            HODemail: req.body.HODemail,
        });
        await clubs.save();
        res.status(201).json(clubs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Update an existing clubs
export async function updateclubs(req, res) {
    try {
        const clubs = await findByIdAndUpdate(
            req.params.clubsId,
            {
                name: req.body.name,
                Acronym: req.body.Acronym,
                Department:req.body.Department,
                College:req.body.College,
                email: req.body.email,
                HODemail: req.body.HODemail,
               
            },
            { new: true }
        );
        if (!clubs) {
            return res.status(404).json({ error: 'clubs not found' });
        }
        res.status(200).json(clubs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Delete an existing clubs
export async function deleteclubs(req, res) {
    try {
        const clubs = await findByIdAndDelete(req.params.clubsId);
        if (!clubs) {
            return res.status(404).json({ error: 'clubs not found' });
        }
        res.status(200).json({ message: 'clubs deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}
