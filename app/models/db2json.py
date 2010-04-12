# -*- encoding=utf8 -*-
import glob
import string
import sqlite3
import sqlalchemy

#from pinyin import hanzi2pinyin

#fs = glob.glob('*.txt')
#fpy_name = ch_

######################################################################3

##########################################################

### from PHP

#while($row  = mysql_fetch_array($rs, MYSQL_ASSOC)) {
#        $ret .= { "firstName" : ".$row[FirstName].", "lastName" : ".$row[LastName].", "position"  : ".$row[Position]." }, ;
#    }
############################################
fileall = []

a = u" "

bigjson = ""
conn = sqlite3.connect('chlib.sqlite')
c = conn.cursor()
c.execute('''select * from chlib;''')
b = [ unicode(u'{grade:"' + t[0] + u'",latin:"' + t[1] + u'",ch:"' + t[2] + u'",py:"' + t[3] + u'"},').encode('utf8') for t in c]


# We can also close the cursor if we are done with it
c.close()

#print fileall
fpy = open('chtmp.txt','w')
fpy.writelines(b)
fpy.close()
