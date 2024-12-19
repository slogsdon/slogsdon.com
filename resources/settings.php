<?php
$author = (object) [
    'shane' => (object) [
        'name' => 'Shane Logsdon',
        'title' => 'Technical Product Leader',
        'description' => 'Technical leader with 15+ years of experience in developer platforms and payment systems. Helping companies build scalable, secure, and customer-led financial solutions.',
    ],
];

return (object) [
    'title' => $author->shane->name,
    'subtitle' => 'Building the Future of Financial Technology',
    'description' => $author->shane->description,
    'avgWordsPerMinute' => 200,
    'author' => $author,
];
