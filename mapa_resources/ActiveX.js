    var currentFolder="";
    function GetDriveList(){
        var fso, obj, n, e, item, arr=[];
        try {
            fso = new ActiveXObject("Scripting.FileSystemObject");
        }
        catch(er) {
            alert('Could not load Drives. The ActiveX control could not be started.');
            cancelFolder();
        }
        e = new Enumerator(fso.Drives);
        for(;!e.atEnd();e.moveNext()){
            item = e.item();
            obj = {letter:"",description:""};
            obj.letter = item.DriveLetter;
            if (item.DriveType == 3) obj.description = item.ShareName;
            else if (item.IsReady) obj.description = item.VolumeName;
            else obj.description = "[Drive not ready]";
            arr[arr.length]=obj;
        }
        return(arr);
    }
    function GetSubFolderList(fld){
        var foldersAndFiles = {
            "folders": [],
            "files": []
        };
        var e, arr=[], arr2=[];
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f = fso.GetFolder(fld.toString());
        var e = new Enumerator(f.SubFolders);
        var e2 = new Enumerator(f.Files);
        for(;!e.atEnd();e.moveNext()){
            arr[arr.length]=e.item().Name;
        }
        for(;!e2.atEnd();e2.moveNext()){
            arr2[arr2.length]=e2.item().Name;
        }
        foldersAndFiles.folders = arr;
        foldersAndFiles.files = arr2;
        return(foldersAndFiles);
    }
    function loadDrives(){
        var drives=GetDriveList(),list="";
        for(var i=0;i<drives.length;i++){
            list+="<div onclick=\"loadList('"+drives[i].letter+':\\\\\')" class="folders" onmouseover="highlight(this)" onmouseout="unhighlight(this)">'+drives[i].letter+':\\ - '+ drives[i].description+'</div>';
        }
        document.getElementById("path").innerHTML='<a href="" onclick="loadDrives();return false" title="My Computer">My Computer</a>\\';
        document.getElementById("list").innerHTML=list;
        currentFolder="";
    }
    function loadList(fld){
        var path="",list="",paths=fld.split("\\");
        var divPath=document.getElementById("path");
        var divList=document.getElementById("list");
        for(var i=0;i<paths.length-1;i++) {
            if(i==paths.length-2) {
            path+=paths[i]+' \\';
            } else {
                path+="<a href=\"\" onclick=\"loadList('";
                for(var j=0;j<i+1;j++){
                    path+=paths[j]+"\\\\";
                }
                    path+='\');return false">'+paths[i]+'</a> \\ ';
            }
        }
        divPath.innerHTML='<a href="" onclick="loadDrives();return false">My Computer</a> \\ '+path;
        divPath.title="My Computer\\"+paths.toString().replace(/,/g,"\\");
        currentFolder=paths.toString().replace(/,/g,"\\");

        var subfolders=GetSubFolderList(fld);
        
        for(var j=0;j<subfolders.folders.length;j++){
            list+="<div onclick=\"loadList('"+(fld+subfolders.folders[j]).replace(/\\/g,"\\\\")+'\\\\\')" onmouseover="highlight(this)" onmouseout="unhighlight(this)" title="'+subfolders.folders[j]+'" class="folders">'+subfolders.folders[j]+"</div>";
        }

        for(var k = 0; k < subfolders.files.length; k++) {
            var index = subfolders.files[k].lastIndexOf('.');
            var ficheroJava = subfolders.files[k].substring(0,index);
            ficheroOriginal = ficheroJava +'.original';
            ficheroNew = ficheroJava+'.new';
            list+="<div onclick=\"lee('"+(fld+subfolders.files[k]).replace(/\\/g,"\\\\")+'\')" onmouseover="highlight(this)" onmouseout="unhighlight(this)" title="'+subfolders.files[k]+'" class="folders">'+subfolders.files[k]+"</div>";
        }

        divList.innerHTML=list;
        resizeList();
        divPath.scrollIntoView();
    }
    function loadFiles(fld){
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var lib;
        var folder = fso.GetFolder(fld.toString());
        lib = fso.GetFileName(folder);
        items = lib.Items()
        for (i=0;i<items.Count;i++)
        {
            arr[i]=items.Item(i);
        }
        return (arr);
    }
    function resizeList(){
        // var divList=document.getElementById("list");
        // var divPath=document.getElementById("path");
        // if(document.body.clientHeight>0 && divPath.offsetHeight>0){
        //     divList.style.height=document.body.clientHeight-divPath.scrollHeight;
        // }
    }
    function highlight(div){
        div.className="folderButton";
    }   
    function unhighlight(div){
        div.className="folders";
    }
    function selectFolder(){
        window.returnValue=currentFolder;
        window.close();
    }
    function cancelFolder(){
        window.returnValue="";
        window.close();
    }

    function getObservador(original, modificado) {
        console.log(original);
        console.log(modificado);
    }

    function lee(fichero/*, observador*/) {
        var original = null;
        var original_loaded = false;
        var destino = null;
        var destino_loaded = false;

        var index = fichero.lastIndexOf('.');
        var ficheroJava = fichero.substring(0,index);
        
        console.log(ficheroJava);
        leeFichero(ficheroJava + '.new', 'page1', function(content) {
            original = content;
            original_loaded = true;
            if (destino_loaded) {
                // observador(original, destino);
            }
        });
        leeFichero(ficheroJava + '.original', 'page2', function(content) {
            destino = content;
            destino_loaded = true;
            if (original_loaded) {
                // observador(original, destino);
            }
        });
    }
    
    function leeFichero(fichero, inname, callback) {
        var iframe = document.getElementById(inname);
        iframe.src = fichero;
        setTimeout(function() {
            try {
                callback(iframe.contentWindow.document.body.innerText);
            } catch (fail) {
                console.log(fail);
                alert("Su navegador no permite acceder al contenido local. Pruebe a usar iexplorer");
            }
        }, 250);
    }
    