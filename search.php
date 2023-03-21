<html>

<head>
    <title>Search - Capstone Presentations Spring 2022</title> 
    <link rel="stylesheet" href="./css/homepage.css">
    <link rel="stylesheet" href="./css/presentations.css">
    <link rel="stylesheet" href="./css/uw-button.css">
    <link rel="stylesheet" href="./css/search-page.css">
    <link rel="stylesheet" href="./css/multiple-rooms.css">
    <script type="text/javascript" src="./js/structure.js"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>
<header>
        <section class="uwb-logo">
            <a href="https://www.uwb.edu/stem"><img src="images/web-white-left-school-signature-uw-bothell.png" alt="UW Bothell School of STEM Logo"></a>
        </section>

        <nav class="align-center" id="dawgdrops">
            <div class="dawgdrops-inner container">
                <ul class="dawgdrops-nav" id="menu-brand-menu">
        
                    <li class="dawgdrops-item">
                        <a href="index.html" id="101" title="Home Page">Home Page</a>
                    </li>
        
                    <li class="dawgdrops-item">
                        <a href="./biological-sciences.html"
                        id="102" title="Biological Sciences">Biological Sciences</a>
                    </li>
        
                    <li class="dawgdrops-item">
                        <a class="dropdown-toggle" href="#"
                        id="103" title="Computing & Software System">Computing & Software Systems</a>
        
                        <ul class="dawgdrops-menu dawgdrops-menu-em" id="menu-104">
                            <li>
                                <a href="./csse.html"
                                title="CSSE">Computer Science & Software Engineering</a>
                            </li>

                            <li>
                                <a href="./applied-computing.html"
                                title="CSSE">Applied Computing</a>
                            </li>
                        </ul>
                    </li>
        
                    <li class="dawgdrops-item">
                        <a href="./electrical-engineering.html"
                        id="102" title="Engineering & Mathematics">Engineering & Mathematics</a>
                    </li>
        
                    <li class="dawgdrops-item">
                        <a class="dropdown-toggle" href="#"
                        id="102" title="Physical Sciences">Physical Sciences</a>

                        <ul class="dawgdrops-menu dawgdrops-menu-em" id="menu-104">
                            <li>
                                <a href="./chemistry+physics.html"
                                title="Physical Sciences">Chemistry & Physics</a>  
                            </li>
                        </ul>
                    </li>

                    <li class="dawgdrops-item">
                        <button type="submit"><a href="https://depts.washington.edu/stemadv/spring-2022/search.php"><i class="fa fa-search"></i></a></button>                  
                    </li>
                </ul>
            </div>
        </nav>
        
        <h1>Spring 2022 Capstone & Symposium</h1>
        <h2>June 10, 2022</h2>
        <hr>
    </header>

    <h2>Search Directory</h2>

    <form action="./search.php" id="search-form" >
        
        <div class="box">
            <button type="submit" class="search-submit"><i class="fa fa-search"></i></button>
            <input type="text" id="keyword" name="keyword" placeholder="Enter name here"><br>
        </div>  
            
        <select id="search-for" name="search-for">
            <option value="student-name">Student Name</option>
            <option value="project-title">Project Title</option>
            <option value="faculty-advisor">Faculty Advisor</option>
        </select>                                      
    </form>

    <p class="text" id="num-result"></p>
    <section id="presentation"></section>

    <?php

        mysqli_report(MYSQLI_REPORT_STRICT);

        try {
            $mysqli_connection = new MySQLi('stemadv.ovid.u.washington.edu', 'root', 'uasfrontdesk!', 'root', 7070);

        } catch (Exception $e ) {
            echo "<p class='text'>Service unavailable. Please try again in a few minutes.</p>";
            exit;
        }

        if (!$mysqli_connection) {
            exit;
        }
        
        if ($mysqli_connection->connect_error){
            // echo "<div class='space'></div>";
            // echo "<p class='text'>Please try again in a few minutes.</p>";
            // echo "Not connected, error: ".$mysqli_connection->connect_error;
        } else {

            $keywordfromform = $_GET["keyword"];
            $search_type = $_GET["search-for"];

            if ($keywordfromform != '') {
                
                if ($search_type == "student-name") {
                    $query_cmd = "SELECT project_id FROM spring2022 WHERE student_name LIKE '%".$keywordfromform."%'";
                } else if ($search_type == "project-title") {
                    $query_cmd = "SELECT project_id FROM spring2022 WHERE project_title LIKE '%".$keywordfromform."%'";
                } else {
                    $query_cmd = "SELECT project_id FROM spring2022 WHERE faculty_advisor LIKE '%".$keywordfromform."%'";
                }

                $result = $mysqli_connection->query($query_cmd);

                echo "<script type='text/javascript'>printNumResults($result->num_rows, '$keywordfromform');</script>";
                
                if ($result->num_rows > 0) {

                    // if ($result->fetch_assoc()["project_id"] == "csse-6-")

                    while ($row = $result->fetch_assoc()) {
                        $id = $row["project_id"];

                        echo "<script type='text/javascript'>search('$id');</script>";

                        if ($id == "csse-6-145") {      // group project
                            break;
                        }
                    }
        
                } else {
                    echo "<div class='space'></div>";
                    // echo "<p class='text'>No projects found</p>";
                }
            }

            $mysqli_connection->close();
        }

    ?>
</body>
</html>
