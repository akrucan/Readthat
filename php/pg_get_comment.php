<?php
    include "connection.php";
    $id = $_GET["id"];
    $query ="Select * from comments where post_id=$id";
    $result = pg_query($con, $query);
    $posts = pg_fetch_all($result);
    echo json_encode($posts);
    header("Content-Type:application/json");
?>
