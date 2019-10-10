<?php

header("Content-type: text/plain");
header("Content-Disposition: attachment; filename=dk-cfb-lineups.csv");


$data = $_POST['csv-data'];

// $file = fopen("dk-cfb-lineup.csv", "w") or die("Unable to open file!");

// fwrite($file, $data);
// fclose($file);

print $data;

?>