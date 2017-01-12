/**
 * imagepager.js - a light weight gallery widget for archives.caltech.edu
 *
 * @author R. S. Doiel, <rsdoiel@caltech.edu>
 * 
 * Copyright (c) 2017, Caltech
 * All rights not granted herein are expressly reserved by Caltech.
 * 
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * 
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * 
 * 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
(function (doc, win) {
    'strict';
    var Version = "v0.0.1";

    function makePage (image, link, caption) {
        return {
            image: image,
            link: link,
            caption: caption,
        };
    };

    function MakePager(objName, elementID) {
        return {
            Version: Version,
            objName: objName,
            elementID: elementID,
            Render: Render,
            pageList: [],
            cur: 0,
            AddPage: AddPage,
            Next: Next,
            Prev: Prev,
            Last: Last,
        };
    };

    function AddPage(image, link, caption) {
        var i = 0;
        i = this.pageList.length + 1
        this.pageList.push(makePage(image, link, caption));
        if (i != this.pageList.length) {
            return false;
        }
        return true;
    }

    function Render(objName, elementID, link, image, caption) {
        return `
<table id="${elementID}" width="97%" border="0" cellspacing="0" cellpadding="0">
    <tr>
        <!-- START: display image ${link}, ${image}, ${caption} -->
        <td align="center" valign="middle"><a href="${link}" alt="${caption}"><img src="${image}" alt="${caption}" width="323" height="199" /></a><br />
        <!--   END: display image -->
        <!-- START: Gallery nav -->
        <table width="100%" border="0" cellpadding="2" cellspacing="0">
            <tr>
                <td width="57" align="right" valign="bottom"><a href="javascript:${objName}.Next()"><img src="/graphics/body/arrow-goback.gif" alt="go back" width="16" height="14" border="0" id="prev" /></a></td> 
                <td width="199" align="center" valign="bottom"><div align="center"><a href="${link}"><img src="graphics/body/go.gif" alt="go to ${link}" name="go" width="182" height="15" border="0" id="go" /></a></div></td> 
                <td width="55" align="left" valign="bottom"><a href="javascript:${objName}.Prev()"><img src="graphics/body/arrow-forward.gif" alt="go forward" width="16" height="14" border="0" id="next" /></a></td> 
            </tr> 
        </table></td>
        <!--   END: Gallery nav -->
    </tr>
    <tr valign="top">
        <td align="center"><p class="rule"><span class="sub5">Images above are from the <a href="http://caltech.discoverygarden.ca/">Caltech Image Archive</a>, an online, searchable database of thousands of images.</span></p></td> 
    </tr>
</table>
`;
    };

    function Next() {
        var elem = doc.getElementById(this.elementID),
            src = "";

        this.cur++;
        if (this.cur >= this.pageList.length) {
            this.cur = 0;
        }
        src = this.Render(
            this.objName,
            this.elementID,
            this.pageList[this.cur].link, 
            this.pageList[this.cur].image, 
            this.pageList[this.cur].caption
        );
        console.log("DEBUG rendered Next() template", src);
        elem.outerHTML = src; 
    }

    function Prev() {
        var elem = doc.getElementById(this.elementID),
            src = "";

        this.cur--;
        if (this.cur < 0) {
            this.cur = this.pageList.length - 1;
        }
        src = this.Render(
            this.objName,
            this.elementID,
            this.pageList[this.cur].link, 
            this.pageList[this.cur].image, 
            this.pageList[this.cur].caption
        ); 
        console.log("DEBUG rendered Prev() template", src);
        elem.outerHTML = src;
    }

    function Last() {
        var elem = doc.getElementById(this.elementID),
            src = "";

        this.cur = this.pageList.length - 1;
        if (this.cur < 0) {
            this.cur = 0;
        }
        src = this.Render(
            this.objName,
            this.elementID,
            this.pageList[this.cur].link,
            this.pageList[this.cur].image, 
            this.pageList[this.cur].caption
        );
        console.log("DEBUG rendered Last() template", src);
        elem.outerHTML = src;
    }

    /* Export Function */
    win.MakePager = MakePager;
}(document, window));
