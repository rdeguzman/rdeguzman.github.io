---
title: OpenLayers and Google Layer Zoom fix
author: rupert
layout: post
permalink: /2007/02/openlayers-and-google-layer-zoom-fix/
categories:
  - openlayers
tags:
  - google
  - openlayers
---
I have finally fixed the disappearing layer on the layer switch when we try to overlay the layer on top of Google. I edited Google.js to reflect the ff:

<div class="wp_syntax">
  <table>
    <tr>
      <td class="code">
        <pre class="js" style="font-family:monospace;">&nbsp;
    MAX_ZOOM_LEVEL: 22,
&nbsp;
    /** Hardcode these resolutions so that they are more closely
     *   tied with the standard wms projection
     *
     * @final @type Array(float) */
/*    RESOLUTIONS: [1.40625,0.703125,0.3515625,0.17578125,0.087890625,0.0439453125,0.02197265625,0.010986328125,0.0054931640625,0.00274658203125,0.001373291015625,0.0006866455078125,0.00034332275390625,0.000171661376953125,0.0000858306884765625,0.00004291534423828125],*/
&nbsp;
RESOLUTIONS:[1.40625,0.703125,0.3515625,0.17578125,0.087890625,0.0439453125,0.02197265625,0.010986328125,0.0054931640625,0.00274658203125,0.001373291015625,0.0006866455078125,0.00034332275390625,0.000171661376953125,0.0000858306884765625,0.00004291534423828125,0.0000214576721191140625,0.000107288360595703125,0.0000053644182978515625,0.000002682209014892578125,0.0000013411045074462890625,0.00000067055225372314453125],</pre>
      </td>
    </tr>
  </table>
</div>