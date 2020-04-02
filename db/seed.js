const Studio = require('../lib/models/studio');
const Film = require('../lib/models/film');
const Actor = require('../lib/models/actor');
const Reviewer = require('../lib/models/reviewer');
const Review = require('../lib/models/review');
const chance = require('chance').Chance();
const moment = require('moment');

module.exports = async({ studiosToCreate = 10, actorsToCreate = 10, filmsToCreate = 10, reviewerToCreate = 10, reviewsToCreate = 110 } = {}) => {

  const country = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', ' Tajikistan', ' Tanzania', 'Thailand', 'Timor', 'Este', 'Togo', 'Tonga', 'Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'];

  const studio = await Studio.create([...Array(studiosToCreate)].map(() => ({
    name: `${chance.animal()} Studios`, 
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.pickone(country)
    }
  })));

  const actor = await Actor.create([...Array(actorsToCreate)].map(() => ({
    name: `${chance.prefix()} ${chance.name()}`,
    dob: moment(
      Math.floor(
        Math.random() * (2020 - 1900) + 1900
      ))
      .calendar(),
    pob: `${chance.city()}, ${chance.state()}` 
  }
  )));

  const film = await Film.create([...Array(filmsToCreate)].map(() => ({
    title: chance.weekday() + ' ' + chance.word(),
    studio: chance.pickone(studio)._id,
    released: Math.floor(Math.random() * (2020 - 1900) + 1900),
    cast: [{
      role: chance.prefix() + ' ' + chance.name(),
      actor: chance.pickone(actor)
    }]
  })));

  const reviewer = await Reviewer.create([...Array(reviewerToCreate)].map(() => ({
    name: `${chance.prefix()} ${chance.name()}`,
    company: `${chance.weekday()}${chance.animal()}.com`,
  })));

  const ratings = [1, 2, 3, 4, 5];
  const review = await Review.create([...Array(reviewsToCreate)].map(() => ({
    rating: chance.pickone(ratings),
    reviewer: chance.pickone(reviewer)._id,
    review: chance.sentence({ words: 5 }),  
    film: chance.pickone(film)._id
  })));
};

