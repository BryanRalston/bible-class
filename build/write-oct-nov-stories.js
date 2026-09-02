'use strict';
// Write October + November 2026 preschool lesson story.json files.
const fs = require('fs');
const path = require('path');

const STYLE =
  "Flat-color children's cartoon storybook illustration, simple rounded shapes, soft warm colors, thick clean black outlines, bright and friendly, gentle lighting, 16:9 landscape composition, no text or words in the image, no letters.";

const lessons = [
  {
    id: 'moses-burning-bush',
    month: 10,
    weekOfMonth: 1,
    title: 'Moses and the Burning Bush',
    reference: 'Exodus 3:1-4:17',
    keyQuestion: "Who's got it?",
    bigIdea: "God's got it!",
    memoryVerse: {
      text: 'Trust in the LORD with all your heart.',
      reference: 'Proverbs 3:5 (NIrV)',
    },
    character:
      'Moses: kind middle-aged man with short dark-brown hair and a short brown beard, wearing a simple tan robe and carrying a wooden walking stick.',
    moral: {
      lesson:
        "God spoke to Moses from a burning bush and asked him to help rescue God's people. Moses felt scared and not important enough, but God promised, \"I will be with you,\" and showed Moses that God can do anything.",
      application:
        "When something feels too big for you, you can trust God. God's got it — and He is with you.",
    },
    beats: [
      {
        n: 1,
        scene:
          'Moses, a kind middle-aged man with short dark-brown hair and a short brown beard in a tan robe, watches sheep on a sunny rocky hillside with green bushes.',
        text: [
          "A long time ago, God's people were in Egypt. A mean king made them work very hard.",
          'God chose a man named Moses to help lead them to a new home.',
          'But Moses was a shepherd — he usually took care of sheep!',
        ],
      },
      {
        n: 2,
        scene:
          'Moses in his tan robe stares in wonder at a green bush that is on fire with bright orange and yellow flames, yet the bush is not burning up. Warm desert hillside.',
        text: [
          'One day Moses saw something amazing — a bush on fire that did not burn up!',
          'There was no smoke. Moses had never seen anything like it.',
          'He walked closer to look.',
        ],
      },
      {
        n: 3,
        scene:
          'Moses kneels by the glowing burning bush, looking up with awe as warm light shines from the bush. Friendly, not scary.',
        text: [
          'Then God spoke to Moses from the bush! God knew Moses by name.',
          'God said He would use Moses to rescue His people.',
          'Moses felt nervous. He said, "I am not important enough."',
        ],
      },
      {
        n: 4,
        scene:
          'Moses holds a wooden walking stick that has just turned into a friendly cartoon snake on the ground; Moses looks surprised but safe. Same tan robe and brown beard.',
        text: [
          'God asked, "What do you have in your hand?" It was a walking stick.',
          'When Moses threw it down, it became a snake — then back into a stick again!',
          'God showed Moses that God can do anything.',
        ],
      },
      {
        n: 5,
        scene:
          'Moses stands bravely with his walking stick, smiling with trust, warm sunlight around him on the hillside. Same face, hair, beard, and tan robe.',
        text: [
          'God said, "I will be with you."',
          'Moses was still a little afraid, but he trusted God.',
          "We can trust God too — because God's got it!",
        ],
      },
    ],
  },
  {
    id: 'moses-and-the-sea',
    month: 10,
    weekOfMonth: 2,
    title: 'Moses and the Sea',
    reference: 'Exodus 13:17-14:31',
    keyQuestion: "Who's got it?",
    bigIdea: "God's got it!",
    memoryVerse: {
      text: 'Trust in the LORD with all your heart.',
      reference: 'Proverbs 3:5 (NIrV)',
    },
    character:
      'Moses: kind middle-aged man with short dark-brown hair and a short brown beard, wearing a simple tan robe and carrying a wooden walking stick (same Moses as burning bush).',
    moral: {
      lesson:
        "God showed His people the way with a pillar of cloud and fire. When they were trapped at the sea, God told Moses to hold up his stick, and God parted the water so they could walk through on dry ground.",
      application:
        "When you don't know which way to go, you can trust God to show you. God's got it!",
    },
    beats: [
      {
        n: 1,
        scene:
          'Moses in tan robe leads a group of happy families (men, women, children in simple ancient clothes) walking through a sunny desert, following a tall soft white pillar of cloud in the sky.',
        text: [
          "God's people, the Israelites, were leaving Egypt for a new home.",
          'God sent Moses to lead them, and God showed them the way!',
          'In the daytime, a tall pillar of cloud showed them where to go.',
        ],
      },
      {
        n: 2,
        scene:
          'At night, the same group camps near the desert as a tall glowing orange pillar of fire lights the dark sky. Moses stands with his stick looking peaceful.',
        text: [
          'At night, God gave them a pillar of fire to light the way.',
          "Wherever God wanted His people to go, He showed them.",
          'God was taking care of them every step.',
        ],
      },
      {
        n: 3,
        scene:
          "God's people look worried beside a big blue sea; in the distance dusty chariots of Pharaoh's army approach. Moses in tan robe stands calm, telling them not to fear.",
        text: [
          'One night they camped next to a big sea.',
          "Then they saw Pharaoh's army coming! They were so scared.",
          'But Moses told them not to worry — God would save them!',
        ],
      },
      {
        n: 4,
        scene:
          'Moses holds his wooden stick high over the sea as a strong wind parts the blue water into two tall walls with a dry path down the middle. Friendly kids cartoon style, not scary.',
        text: [
          'God told Moses to hold up his walking stick over the water.',
          'A strong wind blew, and God pushed the water back!',
          'God made a dry path right through the middle of the sea.',
        ],
      },
      {
        n: 5,
        scene:
          'Happy Israelites walk safely through the parted sea on dry ground between walls of water, Moses leading with his stick, everyone smiling with joy and relief.',
        text: [
          "God's people walked through the sea on dry ground!",
          'God is so powerful, and He loves us so much.',
          "We can always trust God to show us the way — because God's got it!",
        ],
      },
    ],
  },
  {
    id: 'elijah-and-the-widow',
    month: 10,
    weekOfMonth: 3,
    title: 'Elijah and the Widow',
    reference: '1 Kings 17:1-16',
    keyQuestion: "Who's got it?",
    bigIdea: "God's got it!",
    memoryVerse: {
      text: 'Trust in the LORD with all your heart.',
      reference: 'Proverbs 3:5 (NIrV)',
    },
    character:
      'Elijah: kind older man with longer grey-streaked dark hair and a full grey-brown beard, wearing a simple brown cloak over a cream tunic. Widow: kind young mother with dark hair in a green headscarf and tan dress. Young son with short dark hair in a light tunic.',
    moral: {
      lesson:
        'When there was no rain, God took care of Elijah with water and food from birds. Then God took care of a widow and her son — their flour and oil never ran out.',
      application:
        'When you worry about what you need, remember God takes care of you. You can trust God no matter what — because God\'s got it!',
    },
    beats: [
      {
        n: 1,
        scene:
          'Elijah, an older man with grey-streaked hair and a full beard in a brown cloak, sits by a sparkling stream in a dry landscape, looking peaceful.',
        text: [
          'Elijah was a prophet — he listened to God and told people what God said.',
          'God told him there would be no rain for a long time.',
          'Then God told Elijah to live by a stream so he would have water.',
        ],
      },
      {
        n: 2,
        scene:
          'Friendly cartoon ravens fly down bringing bread to Elijah by the stream. Elijah smiles and holds out his hands. Soft warm colors, not scary birds.',
        text: [
          'God made sure Elijah had food, too — in a really cool way!',
          'God sent birds to bring Elijah bread and meat every morning and evening.',
          'God took care of Elijah!',
        ],
      },
      {
        n: 3,
        scene:
          'Elijah talks kindly with a sad young widow in a green headscarf and tan dress; her young son stands nearby looking tired. Small house and dry dusty town.',
        text: [
          'When the stream dried up, God sent Elijah to a town.',
          'A widow there had only a little flour and oil left for her and her son.',
          'She was very sad — after that bread, their food would be gone.',
        ],
      },
      {
        n: 4,
        scene:
          'The widow mixes flour and oil in a bowl while Elijah watches kindly; soft warm light. Same faces and clothes.',
        text: [
          'Elijah said, "Don\'t be afraid. Make a little bread for me, then for you and your son."',
          'God promised their flour and oil would not run out.',
          'The woman trusted God and did what Elijah said.',
        ],
      },
      {
        n: 5,
        scene:
          'Happy widow, son, and Elijah share fresh bread at a simple table; jars of flour and oil still look full. Warm joyful kitchen scene.',
        text: [
          'Just like God said, the jar always had flour, and the jug always had oil!',
          'God took care of Elijah, the widow, and her son.',
          "We can trust God no matter what — because God's got it!",
        ],
      },
    ],
  },
  {
    id: 'hezekiah-prays',
    month: 10,
    weekOfMonth: 4,
    title: 'King Hezekiah Prays to God',
    reference: 'Isaiah 37:14-21; 38:1-6; 2 Kings 20:1-5',
    keyQuestion: "Who's got it?",
    bigIdea: "God's got it!",
    memoryVerse: {
      text: 'Trust in the LORD with all your heart.',
      reference: 'Proverbs 3:5 (NIrV)',
    },
    character:
      'King Hezekiah: kind adult king with short dark hair, short dark beard, golden crown, and a purple and gold royal robe. Isaiah: older prophet with grey hair and beard in a simple blue robe.',
    moral: {
      lesson:
        'King Hezekiah loved God and talked to God about everything — when an army came, and when he was sick. God heard his prayers, saved the city, and made him well.',
      application:
        'You can talk to God about anything — when you are happy, sad, sick, or scared. God hears you, because God\'s got it!',
    },
    beats: [
      {
        n: 1,
        scene:
          'King Hezekiah in a purple and gold robe and golden crown smiles kindly in a sunny palace courtyard, looking peaceful and trusting.',
        text: [
          'King Hezekiah loved God. He did what God wanted because he trusted God.',
          'And God was with King Hezekiah.',
          'One day trouble came — an army wanted to fight God\'s people.',
        ],
      },
      {
        n: 2,
        scene:
          'King Hezekiah kneels in prayer with hands together in a palace room, eyes closed, trusting. Soft warm light from a window.',
        text: [
          'King Hezekiah trusted God. He prayed!',
          'He said, "God, You are the one true God. You made everything. Please save us!"',
          'He talked to God about the problem.',
        ],
      },
      {
        n: 3,
        scene:
          'Isaiah the prophet in a blue robe brings a hopeful message to King Hezekiah; both look relieved and joyful in the palace.',
        text: [
          'God sent Isaiah the prophet with a message.',
          '"God has heard your prayer. This army will not enter your city. God will save you!"',
          "Hooray — God's got it!",
        ],
      },
      {
        n: 4,
        scene:
          'King Hezekiah lies sick in bed looking sad, still praying with hands folded. Soft gentle lighting, not scary.',
        text: [
          'Later, King Hezekiah became very sick and very sad.',
          'So he prayed again. He trusted God with his whole heart.',
          'God saw his tears and heard his prayer.',
        ],
      },
      {
        n: 5,
        scene:
          'Healthy happy King Hezekiah jumps up smiling, celebrating with Isaiah nearby; warm sunny palace, joyful mood.',
        text: [
          'Isaiah said, "God is going to make you all better!"',
          'And King Hezekiah got better! He praised God with singing.',
          "We can talk to God about anything — because God's got it!",
        ],
      },
    ],
  },
  {
    id: 'celebrate-creation',
    month: 11,
    weekOfMonth: 1,
    title: 'Celebrate What God Made',
    reference: 'Psalm 33; Psalm 100',
    keyQuestion: 'Who can celebrate God?',
    bigIdea: 'I can celebrate God.',
    memoryVerse: {
      text: 'Shout aloud and sing for joy.',
      reference: 'Isaiah 12:6 (NIV)',
    },
    character:
      'Diverse joyful preschool-age children celebrating outdoors: a girl with dark curly hair in a yellow dress, a boy with light brown hair in a blue shirt, and a girl with straight black hair in a green dress.',
    moral: {
      lesson:
        'God made the whole world — the sky, oceans, animals, plants, stars, and you! The Bible says we can shout and sing for joy because of all the wonderful things God has done.',
      application:
        'Look around at what God made and celebrate Him. You can celebrate God for what He made!',
    },
    beats: [
      {
        n: 1,
        scene:
          'Three joyful kids stand on a green hill under a bright blue sky with fluffy clouds and a shining sun, arms raised in celebration. Flat-color cartoon.',
        text: [
          'God has done wonderful things!',
          'God spoke and made the world. He made the sky above us.',
          'Everywhere we look, we can see what God made.',
        ],
      },
      {
        n: 2,
        scene:
          'Friendly cartoon ocean with whales and colorful fish; kids on a sandy shore pointing happily at the water. Soft warm colors.',
        text: [
          'God made the oceans full of fish and whales.',
          'God made the land with mountains and trees.',
          'God made so many amazing animals!',
        ],
      },
      {
        n: 3,
        scene:
          'A cheerful parade of friendly land animals (lion, elephant, bunny, bird) in a sunny meadow; kids smile nearby. Gentle, not scary.',
        text: [
          'God made birds that fly and animals that live on land.',
          'God made the stars, the rain, and the plants.',
          'And God made you, too!',
        ],
      },
      {
        n: 4,
        scene:
          'Kids singing and clapping under a starry evening sky with a big friendly moon. Warm celebratory mood.',
        text: [
          'The Bible says, "Shout aloud and sing for joy!"',
          'We can celebrate God for what He made.',
          'God watches over each of us.',
        ],
      },
      {
        n: 5,
        scene:
          'Kids holding hands in a circle dancing joyfully in a sunny park with flowers and trees. Big happy smiles.',
        text: [
          'God made the whole world around us.',
          'There are so many blessings to celebrate!',
          'Who can celebrate God? I can celebrate God!',
        ],
      },
    ],
  },
  {
    id: 'deborah',
    month: 11,
    weekOfMonth: 2,
    title: 'Deborah',
    reference: 'Judges 4:1-10, 14; 5:1-31',
    keyQuestion: 'Who can celebrate God?',
    bigIdea: 'I can celebrate God.',
    memoryVerse: {
      text: 'Shout aloud and sing for joy.',
      reference: 'Isaiah 12:6 (NIV)',
    },
    character:
      'Deborah: wise kind woman with long dark hair, tan skin, wearing a teal robe and a soft cream head covering. Barak: adult man with short dark hair and beard in an olive-green tunic.',
    moral: {
      lesson:
        "Deborah listened to God and helped lead God's people. God kept His promise and helped them. Then Deborah and Barak sang a song to celebrate God!",
      application:
        'You can sing to celebrate God, just like Deborah. Who can celebrate God? I can celebrate God!',
    },
    beats: [
      {
        n: 1,
        scene:
          "Deborah sits under a large shady palm tree outdoors, looking wise and kind, talking gently to people who have come to see her.",
        text: [
          "God's people were sad. A mean king had been hurting them.",
          'Deborah was a leader who listened to God.',
          'People came to her under a palm tree for help.',
        ],
      },
      {
        n: 2,
        scene:
          'Deborah speaks bravely to Barak; both look determined and hopeful. Sunny outdoor setting.',
        text: [
          'God told Deborah what to do.',
          'She told Barak that God would help them.',
          'Barak said he would go if Deborah came with him.',
        ],
      },
      {
        n: 3,
        scene:
          "Deborah and Barak lead a friendly group of God's people across sunny hills; they look brave and trusting, not violent or scary.",
        text: [
          'So Deborah went with Barak.',
          'They led God\'s people, trusting God every step.',
          'God promised to help — and God always keeps His promises.',
        ],
      },
      {
        n: 4,
        scene:
          "Happy celebration scene: Deborah and Barak and God's people cheer with joy under a bright sky. Soft victory mood, no fighting shown.",
        text: [
          'God did exactly what He promised!',
          "God helped His people.",
          'They were so happy and thankful.',
        ],
      },
      {
        n: 5,
        scene:
          'Deborah and Barak sing joyfully with mouths open in song, arms raised; other people clap and celebrate with them.',
        text: [
          'Deborah and Barak sang a song to celebrate God!',
          'We can sing to celebrate God, too.',
          'Who can celebrate God? I can celebrate God!',
        ],
      },
    ],
  },
  {
    id: 'miriam-sings',
    month: 11,
    weekOfMonth: 3,
    title: 'Miriam Celebrates',
    reference: 'Exodus 15:1-21',
    keyQuestion: 'Who can celebrate God?',
    bigIdea: 'I can celebrate God.',
    memoryVerse: {
      text: 'Shout aloud and sing for joy.',
      reference: 'Isaiah 12:6 (NIV)',
    },
    character:
      'Miriam: joyful woman with long dark curly hair, tan skin, bright coral-pink robe, holding a small tambourine. Moses: same as before — short dark-brown hair, short brown beard, tan robe.',
    moral: {
      lesson:
        "After God saved His people at the sea, Moses and Miriam celebrated! Miriam played music and sang, \"Sing to the Lord!\" and all the people celebrated God together.",
      application:
        'You can celebrate God with others — with singing, music, and joy. Who can celebrate God? I can celebrate God!',
    },
    beats: [
      {
        n: 1,
        scene:
          "God's people stand safely on a sunny beach after crossing, looking relieved and amazed; blue sea behind them. Moses stands with his stick.",
        text: [
          "God had just saved His people at the sea!",
          'It looked like there was nowhere to go — but God made a way.',
          'Now everyone was safe on the other side.',
        ],
      },
      {
        n: 2,
        scene:
          'Moses and the people begin to celebrate on the shore — smiling, arms raised, thankful faces.',
        text: [
          'Moses and God\'s people celebrated what God had done.',
          'They were so thankful God rescued them.',
          'It was time to praise God!',
        ],
      },
      {
        n: 3,
        scene:
          'Miriam in a coral-pink robe joyfully plays a tambourine, dancing with a big smile on the sandy shore.',
        text: [
          'Miriam, Moses\' sister, celebrated too!',
          'She played music and danced for God.',
          'She wanted everyone to join in.',
        ],
      },
      {
        n: 4,
        scene:
          'Miriam leads a line of smiling women and children with tambourines and ribbons in a happy parade along the shore. Moses smiles nearby.',
        text: [
          'Miriam sang, "Sing to the Lord!"',
          'All the people celebrated God together.',
          'What a joyful parade of praise!',
        ],
      },
      {
        n: 5,
        scene:
          'Big group celebration: Miriam, Moses, and families singing and dancing under a bright sky by the sea. Warm joyful colors.',
        text: [
          'They celebrated God with others.',
          'We can celebrate God with our family and friends, too.',
          'Who can celebrate God? I can celebrate God!',
        ],
      },
    ],
  },
  {
    id: 'feast-of-booths',
    month: 11,
    weekOfMonth: 4,
    title: 'The Feast of Booths',
    reference: 'Deuteronomy 16:13-17; Leviticus 23:33-43',
    keyQuestion: 'Who can celebrate God?',
    bigIdea: 'I can celebrate God.',
    memoryVerse: {
      text: 'Shout aloud and sing for joy.',
      reference: 'Isaiah 12:6 (NIV)',
    },
    character:
      'A friendly ancient Israelite family: father with short dark beard in a brown tunic, mother with dark hair in a blue headscarf and cream dress, boy and girl children in simple colorful tunics.',
    moral: {
      lesson:
        "God took care of His people for forty years in the desert — food, water, even their shoes! Later God asked them to celebrate for seven days in booths (tents) so they would remember that God always takes care of them.",
      application:
        'God still gives us what we need. You can celebrate God for everything! Who can celebrate God? I can celebrate God!',
    },
    beats: [
      {
        n: 1,
        scene:
          'Israelite family walks through a sunny desert carrying packs; a soft cloud pillar is far ahead. They look provided-for and peaceful.',
        text: [
          "After God rescued His people from Egypt, they lived in the desert for forty years.",
          'God gave them everything they needed.',
          'Food to eat, water to drink, and He showed them where to go.',
        ],
      },
      {
        n: 2,
        scene:
          'Family sits outside a simple leafy booth/tent home in the desert, sharing bread and water, smiling. Friendly camp scene.',
        text: [
          'They lived in booths — like tents — not houses.',
          'God even made sure their shoes did not wear out!',
          'God loved His people and took care of them.',
        ],
      },
      {
        n: 3,
        scene:
          'Same family works happily in a green garden with vegetables growing under sunshine and gentle rain clouds. Warm grateful mood.',
        text: [
          'One day God led them to a new place with gardens and food.',
          'But God still took care of them — He made the sun shine and the rain fall.',
          'God made the food grow!',
        ],
      },
      {
        n: 4,
        scene:
          'Many families gather for a joyful outdoor feast beside leafy booths decorated with branches and fruit. Seven-day celebration mood.',
        text: [
          'God said, "Celebrate what I did for seven days."',
          'Everyone came together — sons, daughters, everyone!',
          'They lived in booths and remembered how God cared for them.',
        ],
      },
      {
        n: 5,
        scene:
          'Family raises hands in thanks at a feast table under stars and lanterns; booths and palm branches around them. Joyful celebration.',
        text: [
          'They ate together and talked about how God always gave them what they needed.',
          'God still takes care of us every day.',
          'Who can celebrate God? I can celebrate God!',
        ],
      },
    ],
  },
  {
    id: 'david-praises-god',
    month: 11,
    weekOfMonth: 5,
    title: 'David Praises God',
    reference: '2 Samuel 6:12-15; 1 Chronicles 15-16',
    keyQuestion: 'Who can celebrate God?',
    bigIdea: 'I can celebrate God.',
    memoryVerse: {
      text: 'Shout aloud and sing for joy.',
      reference: 'Isaiah 12:6 (NIV)',
    },
    character:
      'King David: joyful adult man with short curly dark hair and a short dark beard, wearing a simple royal blue tunic with a gold sash (not oversized crown clutter — small gold circlet). Energetic and kind.',
    moral: {
      lesson:
        'King David celebrated God with all his might as the ark of the covenant came home. He danced, people played trumpets, and David told musicians to thank God every day because God is good and always loves us.',
      application:
        'You can celebrate God all the time — with dancing, singing, and saying thank you. Who can celebrate God? I can celebrate God!',
    },
    beats: [
      {
        n: 1,
        scene:
          'A joyful parade brings a special golden box (ark) on poles along a sunny road; people smile and cheer. King David walks ahead looking excited.',
        text: [
          'King David threw a big celebration!',
          'He was bringing home a special golden box called the ark of the covenant.',
          "It helped God's people remember that God was with them.",
        ],
      },
      {
        n: 2,
        scene:
          'People shout and play friendly cartoon trumpets and drums in a parade; bright banners, happy faces. No text on banners.',
        text: [
          'God had done so much for His people.',
          'Some people shouted to celebrate God.',
          'Others played trumpets!',
        ],
      },
      {
        n: 3,
        scene:
          'King David dances with all his might before the Lord — leaping joyfully with arms out, big smile, blue tunic and gold sash. Friendly celebration, not silly or mocking.',
        text: [
          'King David danced before the Lord with all his might!',
          'Some people thought a king should not dance like that.',
          'But David knew he should celebrate God no matter what.',
        ],
      },
      {
        n: 4,
        scene:
          'David talks with smiling musicians holding harps and trumpets near the palace; warm inviting scene.',
        text: [
          'After the ark came home, David gave musicians a special job.',
          'He wanted them to sing and play music to celebrate God every day!',
          'David said, "Give thanks to God because He is good."',
        ],
      },
      {
        n: 5,
        scene:
          'David and a crowd of families celebrate together — dancing, singing, thanking God under a bright sky. Joyful finale.',
        text: [
          'God is good, and God will always love you.',
          'We can celebrate God in the morning and at night — all the time!',
          'Who can celebrate God? I can celebrate God!',
        ],
      },
    ],
  },
];

const root = path.join(__dirname, '..', 'lessons');
for (const L of lessons) {
  const dir = path.join(root, L.id);
  fs.mkdirSync(path.join(dir, 'images'), { recursive: true });
  const story = {
    id: L.id,
    month: L.month,
    weekOfMonth: L.weekOfMonth,
    title: L.title,
    reference: L.reference,
    keyQuestion: L.keyQuestion,
    bigIdea: L.bigIdea,
    memoryVerse: L.memoryVerse,
    moral: L.moral,
    style: STYLE,
    character: L.character,
    beats: L.beats,
  };
  fs.writeFileSync(path.join(dir, 'story.json'), JSON.stringify(story, null, 2));
  console.log('wrote', L.id);
}
console.log('done', lessons.length);
