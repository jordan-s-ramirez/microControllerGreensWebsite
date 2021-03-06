<?php
    header('Access-Control-Allow-Origin: *');
    
    // Data Base Vars
    $servername = "localhost";
    $dbname = "jordanra_microControllerGreens";
    $username = "jordanra_admin";
    $password = "microGreens123";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Printing Data
    $query = "SELECT * FROM ESPsettings ORDER BY lightOn LIMIT 1";

    if ($result = $conn->query($query)) {
        while ($row = $result->fetch_assoc()) {
            // $output = array($row["breakBeam"],$row["moisture"],$row["light"],$row["readingTime"]);
            $field->lightOn = $row["lightOn"];
            $field->lightOff = $row["lightOff"];
            
            $output = json_encode($field);
            echo $output;
            //echo '<b>'.$field1name.$field2name.$field3name.$field4name.'</b><br />';
        }

        /*freeresultset*/
        $result->free();
    }
    
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    
    $conn->close();
    ?>