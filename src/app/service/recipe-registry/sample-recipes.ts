import { Recipe } from '../model';

export const sampleRecipes: Recipe[] = [
  {
    id: 'b925c959-1015-4d6c-882e-1dcdd558fc27',
    title: 'Blaubeermuffins',
    description:
      'Sehr saftige Blaubeer-Muffins, auch bei warmem Wetter sehr zu empfehlen.',
    tags: ['Kuchen', 'Muffin', 'Blaubeeren', 'Sommer'],
    ingredients: [
      {
        amount: 250,
        unit: 'g',
        name: 'Mehl',
      },
      {
        amount: 150,
        unit: 'g',
        name: 'Zucker',
      },
      {
        amount: 0.5,
        unit: 'Päckchen',
        name: 'Backpulver',
      },
      {
        amount: 1,
        unit: 'Päckchen',
        name: 'Vanillezucker',
      },
      {
        amount: 1,
        unit: 'Prise',
        name: 'Salz',
      },
      {
        amount: 150,
        unit: 'ml',
        name: 'Milch',
      },
      {
        amount: 150,
        unit: 'g',
        name: 'Butter',
      },
      {
        amount: 2,
        unit: '',
        name: 'Eier',
      },
      {
        amount: 200,
        unit: 'g',
        name: 'Blaubeeren',
      },
    ],
  },
  {
    id: '59cd4642-8337-4bd0-bf54-3ba5292d6c38',
    title: 'Spinat-Lasagne',
    description: 'Lasagne ohne Fleisch, dafür mit Spinat und extra Schafskäse.',
    tags: ['Lasagne', 'Pasta', 'Nudeln', 'Vegetarisch', 'Spinat'],
    ingredients: [
      {
        amount: 3,
        unit: '',
        name: 'Knoblauchzehen',
      },
      {
        amount: 3,
        unit: '',
        name: 'Zwiebeln',
      },
      {
        amount: 600,
        unit: 'g',
        name: 'Blattspinat (TK)',
      },
      {
        amount: 3,
        unit: 'EL',
        name: 'Wasser',
      },
      {
        amount: 50,
        unit: 'g',
        name: 'Butter',
      },
      {
        amount: 50,
        unit: 'g',
        name: 'Mehl',
      },
      {
        amount: 500,
        unit: 'ml',
        name: 'Milch',
      },
      {
        amount: 500,
        unit: 'ml',
        name: 'Gemüsebrühe',
      },
      {
        amount: 1,
        unit: '',
        name: 'Salz und Pfeffer',
      },
      {
        amount: 1,
        unit: '',
        name: 'Muskat',
      },
      {
        amount: 300,
        unit: 'g',
        name: 'Lasagneplatten, ohne Vorgaren',
      },
      {
        amount: 100,
        unit: 'g',
        name: 'geriebenen Käse',
      },
    ],
  },
  {
    id: '75c12600-d951-4b9b-aaef-fb26c3681bc1',
    title: 'Zitronenkuchen',
    description:
      'Dieser Zitronenkuchen besticht durch seinen intensiv fruchtigen Geschmack.',
    tags: ['Kuchen', 'Zitronen', 'Sommer'],
    ingredients: [
      {
        amount: 200,
        unit: 'g',
        name: 'Butter, weich',
      },
      {
        amount: 300,
        unit: 'g',
        name: 'Puderzucker',
      },
      {
        amount: 250,
        unit: 'g',
        name: 'Mehl',
      },
      {
        amount: 5,
        unit: '',
        name: 'Eier, getrennt',
      },
      {
        amount: 4,
        unit: '',
        name: 'unbehandelte Zitronen',
      },
      {
        amount: 1,
        unit: 'TL',
        name: 'Backpulver',
      },
    ],
  },
];
