exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();
  await knex("items").insert([
    {
      item_id: 1,
      item_name: "Shroom Variant One",
      item_blurb:
        "This is a blurb describing the scroom variant, a little bit of info to get the custy clicking.",
      item_description:
        "This is a unique mushroom strain only available on spore stash. It was created in our labs by cross pollenating classic psycilibin cubensis with the ever popular penis envy. The girthy stem and bulbous cap are not to be missed. The spores look very interesting under a microscope, especially after eating some of the fully grown mushrooms. But definitely don’t do that because it is illegal. One time I did this and ran around the house naked until my friends pleaded with me to put my clothes back on because I was “ruining their high”.",
      item_category: "spore",
      item_quantity: 20,
      item_price: 22.0,
      units_available: 20,
      is_available: true,
      image_url:
        "https://images.unsplash.com/photo-1570977042406-8fba157deca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      created_date: "2022-03-17",
      is_active: true,
    },
    {
      item_id: 2,
      item_name: "Another Kind of Shroom",
      item_blurb:
        "This is a blurb describing the scroom variant, a little bit of info to get the custy clicking.",
      item_description:
        "This is a unique mushroom strain only available on spore stash. It was created in our labs by cross pollenating classic psycilibin cubensis with the ever popular penis envy. The girthy stem and bulbous cap are not to be missed. The spores look very interesting under a microscope, especially after eating some of the fully grown mushrooms. But definitely don’t do that because it is illegal. One time I did this and ran around the house naked until my friends pleaded with me to put my clothes back on because I was “ruining their high”.",
      item_category: "spore",
      item_quantity: 30,
      item_price: 18.0,
      units_available: 30,
      is_available: true,
      image_url:
        "https://images.unsplash.com/photo-1542417938-a39dba3afeb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      created_date: "2022-03-10",
      is_active: true,
    },
    {
      item_id: 3,
      item_name: "Yet Another Shroom",
      item_blurb:
        "This is a blurb describing the scroom variant, a little bit of info to get the custy clicking.",
      item_description:
        "This is a unique mushroom strain only available on spore stash. It was created in our labs by cross pollenating classic psycilibin cubensis with the ever popular penis envy. The girthy stem and bulbous cap are not to be missed. The spores look very interesting under a microscope, especially after eating some of the fully grown mushrooms. But definitely don’t do that because it is illegal. One time I did this and ran around the house naked until my friends pleaded with me to put my clothes back on because I was “ruining their high”.",
      item_category: "spore",
      item_quantity: 40,
      item_price: 24.0,
      units_available: 40,
      is_available: true,
      image_url:
        "https://images.unsplash.com/photo-1570977042406-8fba157deca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      created_date: "2022-03-03",
      is_active: true,
    },
    {
      item_id: 4,
      item_name: "Sporestash Stickers",
      item_blurb:
        "This is a blurb describing the strickers, a little bit of info to get the custy clicking.",
      item_description:
        "This is some details about the stickers I'm trying to make it long so tha tit fills up space. This is some details about the stickers I'm trying to make it long so tha tit fills up space. This is some details about the stickers I'm trying to make it long so tha tit fills up space. This is some details about the stickers I'm trying to make it long so tha tit fills up space. This is some details about the stickers I'm trying to make it long so tha tit fills up space. ",
      item_category: "more",
      item_quantity: 100,
      item_price: 5.0,
      units_available: 100,
      is_available: true,
      image_url:
        "https://images.unsplash.com/photo-1619646081160-033d1d793388?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      created_date: "2022-02-27",
      is_active: true,
    },
    {
      item_id: 5,
      item_name: "Sporestash Hoody",
      item_blurb:
        "This is a blurb describing the hoodies, a little bit of info to get the custy clicking.",
      item_description:
        "This is some details about the Hoodies I'm trying to make it long so tha tit fills up space. This is some details about the Hoodies I'm trying to make it long so tha tit fills up space. This is some details about the Hoodies I'm trying to make it long so tha tit fills up space. This is some details about the Hoodies I'm trying to make it long so tha tit fills up space. This is some details about the Hoodies I'm trying to make it long so tha tit fills up space. ",
      item_category: "more",
      item_quantity: 10,
      item_price: 45.0,
      units_available: 10,
      is_available: true,
      image_url:
        "https://images.unsplash.com/photo-1499971856191-1a420a42b498?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=762&q=80",
      created_date: "2022-02-22",
      is_active: true,
    },
  ]);
};
