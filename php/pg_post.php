<?php
    include "connection.php";
    pg_insert($con, "posts", $_POST);
?>