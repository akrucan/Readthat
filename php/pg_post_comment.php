<?php
    include "connection.php";
    pg_insert($con, "comments", $_POST);
?>