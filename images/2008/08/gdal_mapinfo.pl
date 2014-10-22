#!/usr/bin/perl
#usage perl test.pl <filename>
open(tabfile, "$ARGV[0]") || die "couldn't open the file!";

$match = "Label";

$sourcename = substr($ARGV[0], 0, index($ARGV[0], "."));
$sourcefile =  $sourcename . ".jpg";
$destinationfile = $sourcename . "_translated.tif";
$warpedfile = $sourcename . ".tif";
$translated_dir = "I:\\\\satimages\\translated";
$warped_dir = "I:\\\\satimages\\warped";

#print "echo \"Translating and Warping $sourcefile\"\n";

print "gdal_translate ";

while($readfile = <tabfile>){
    if($readfile =~ /$match/){
        $readfile =~ s/  //g;
        $readfile =~ s/\(//g;
        $readfile =~ s/\)//g;
        $readfile =~ s/ Label//g;
        $myindex = index($readfile, "Pt");
        $newline = substr($readfile, 0, $myindex-2);
        $newline=~ s/,/ /g;
        ($xeast,$xnorth,$xpixel,$xline)= split(/ /, $newline);
        print " -gcp $xpixel $xline $xeast $xnorth";
    }
}

print " -of GTiff $sourcefile $translated_dir\\$destinationfile";

print "\n";

print "gdalwarp -s_srs epsg:4326 -t_srs epsg:4326 $translated_dir\\$destinationfile $warped_dir\\$warpedfile \n";


print "erase I:\\satimages\\translated\\$destinationfile"; 

print "\n";

print "\n";

close(tabfile);

