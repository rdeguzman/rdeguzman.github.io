#!/bin/sh

# chkconfig: 345 90 14
# description: starts the ColdFusion MX server


PATH=/usr/xpg4/bin:/bin:/sbin:/usr/bin:/usr/sbin:$PATH
CONNECTOR=""
RUNTIME_USER=""nobody""
JAVA_HOME="/opt/coldfusion8/runtime/jre"
JAVA_EXECUTABLE="/opt/coldfusion8/runtime/jre/bin/java"
DOCROOT="/opt/coldfusion8/wwwroot"
CF_DIR="/opt/coldfusion8"
IS_RUNNING="false"
IS_MAC="false"

ID=`id -u`

if [ "`uname`" = "Darwin" ]; then
  # nothing, on OSX we don't care about the user name.  We assume that the user running it has permission to do everything
  IS_MAC="true" 
elif [ ! $ID -eq 0 ]; then
	echo "You must be root to start ColdFusion ."
	exit 1
fi

cfrunning() {
    IS_RUNNING="false"
    if [ $OS = "Solaris" ]; then
        # The comm output on Solaris includes the full path
        ps -eo comm | xargs -n 1 basename | fgrep coldfusion8 > /dev/null 2>&1
    else
        # other platforms have only the executable name
        $PSCMD | fgrep coldfusion8  > /dev/null 2>&1
    fi
    if [ $? -eq 0 ]; then
        IS_RUNNING="true"
    fi
}


cfstart() {

	[ -f $CF_DIR/bin/jvm.config ] || {
		ln -s $CF_DIR/runtime/bin/jvm.config $CF_DIR/bin/jvm.config
	}

    cfrunning
    
    if [ "$IS_RUNNING" = "true" ]; then
		echo "ColdFusion 8 is already running"
		echo exiting
		exit 2    
    fi


	echo "Starting ColdFusion 8..."

	eval $CFSTART >> $CF_DIR/logs/cfserver.log 2>&1

	echo "The ColdFusion 8 server is starting up and will be available shortly."

	# Insert a sleep statement to give the server a few moments.

	sleep 5

    cfrunning
    
    if [ "$IS_RUNNING" = "false" ]; then
		echo "There has been an error starting ColdFusion 8, please check the logs."
		exit 1
	fi

	[ -f "$CF_DIR/bin/cf-connectors.sh" ] && {
		# give the server a few more seconds to come up
		sleep 5
		echo "======================================================================"
		echo "Running the ColdFusion 8 connector wizard"
		echo "======================================================================"

		sh $CF_DIR/bin/cf-connectors.sh && {
			mv -f $CF_DIR/bin/cf-connectors.sh $CF_DIR/bin/cf-connectors-run.sh
		}
	}


	echo "======================================================================"
	echo "ColdFusion 8 has been started."
	echo "ColdFusion 8 will write logs to $CF_DIR/logs/cfserver.log"
	echo "======================================================================"

}

cfstop() {

	cfrunning
		
	if [ "$IS_RUNNING" = "false" ]; then
		echo "ColdFusion 8 does not seem to be currently running"
		return
	fi

	echo "Stopping ColdFusion 8, please wait"

	eval $CFSTOP

	sleep 10

	cfrunning
	
	if [ "$IS_RUNNING" = "true" ]; then
	    echo "The ColdFusion 8 server seems to be hanging, will stop non-gracefully"	
        if [ $OS = "Solaris" ]; then
            $PSCMD | fgrep runtime/bin/coldfusion8 | awk '{print $1}' | xargs kill -9 > /dev/null 2>&1
        else
            # other platforms have only the executable name
            $PSCMD | fgrep coldfusion8 | awk '{print $1}' | xargs kill -9 > /dev/null 2>&1
        fi
        sleep 2
	fi
	
	cfrunning
	
	if [ "$IS_RUNNING" = "true" ]; then
		echo "There are some very stubborn ColdFusion 8 processes that will not die, please kill the following PIDs by hand: "
        if [ $OS = "Solaris" ]; then
		    $PSCMD | fgrep runtime/bin/coldfusion8 | awk '{print $1}'
        else
            # other platforms have only the executable name
    		$PSCMD | fgrep coldfusion8 | awk '{print $1}'
        fi
		echo exiting
		exit 1
	fi

	echo "ColdFusion 8 has been stopped"
}


case `uname` in

	SunOS)
		OS=Solaris
		PSCMD="ps -eo pid,comm"
		LD_LIBRARY_PATH="$CF_DIR/lib:$CF_DIR/lib/_solaris/bin"
		CFSTART='su $RUNTIME_USER -c "PATH=$PATH:$CF_DIR/runtime/bin; export PATH; LD_LIBRARY_PATH=$LD_LIBRARY_PATH; export LD_LIBRARY_PATH; cd $CF_DIR/runtime/bin; nohup $CF_DIR/runtime/bin/coldfusion8 -jar jrun.jar -autorestart -start coldfusion &"'
		CFSTOP='su $RUNTIME_USER -c "PATH=$PATH:$CF_DIR/runtime/bin; export PATH; cd $CF_DIR/runtime/bin; $CF_DIR/runtime/bin/coldfusion8 -jar jrun.jar stop coldfusion"'
	;;

	Darwin)
		OS=Darwin
		PSCMD="ps -axc"
		LD_LIBRARY_PATH="$CF_DIR/lib"
		CFSTART='export PATH=$PATH:$CF_DIR/runtime/bin; LD_LIBRARY_PATH=$LD_LIBRARY_PATH; export LD_LIBRARY_PATH;cd $CF_DIR/runtime/bin; $CF_DIR/runtime/bin/coldfusion8 -jar jrun.jar -autorestart -nohup -start coldfusion &'
		CFSTOP='env -i; cd $CF_DIR/runtime/bin; $CF_DIR/runtime/bin/coldfusion8 -jar jrun.jar stop coldfusion'
	;;

	Linux)
		OS=Linux
		PSCMD="ps -eo pid,comm"
		LD_LIBRARY_PATH="$CF_DIR/lib:$CF_DIR/lib/_ilnx21/bin"
		SUCMDFILE=su
		if [ -x /sbin/runuser ]; then
			SUCMDFILE=/sbin/runuser
		fi
		CFSTART='$SUCMDFILE -s /bin/sh $RUNTIME_USER -c "export PATH=$PATH:$CF_DIR/runtime/bin; export LD_LIBRARY_PATH=$LD_LIBRARY_PATH; cd $CF_DIR/runtime/bin; nohup $CF_DIR/runtime/bin/coldfusion8 -jar jrun.jar -autorestart -start coldfusion &"'
		CFSTOP='$SUCMDFILE -s /bin/sh $RUNTIME_USER -c "env -i; cd $CF_DIR/runtime/bin; $CF_DIR/runtime/bin/coldfusion8 -jar jrun.jar stop coldfusion"'

		# Some Java JVMs (both from Sun and IBM) don't work with the new floating stack
		# feature of the i686 version of glibc.  Force glibc to use the deprecated stack model.
		# Check if the OS is SuSE8.1 or SuSE 9 - if it is, do not use the deprecated stack model.
		#SUSEFLAG=`grep 'SuSE Linux 8.1\|UnitedLinux 1.0\|SuSE Linux 9\|SUSE LINUX Enterprise Server 9' /etc/SuSE-release /etc/UnitedLinux-release /etc/UnitedLinux-release 2> /dev/null`

		#if [ ! "$SUSEFLAG" ]; then
			#LD_ASSUME_KERNEL=2.2.9
			#export LD_ASSUME_KERNEL
		#fi
	;;

	*)
		echo "Your OS: `uname` is unsupported"
		echo "exiting"
		exit 1
	;;

esac

ARG=$1

[ -z "$ARG" ] && ARG=usage

case $ARG in

	start)
		cfstart
	;;

	stop)
		cfstop
	;;

	restart)
		echo "Restarting ColdFusion 8..."
		cfstop
		cfstart
	;;

	status)
		if [ -x "$CF_DIR/bin/cfstat" ]; then
			shift
			$CF_DIR/bin/cfstat $@
		else
			echo "$0: $CF_DIR/bin/cfstat no such file"
		fi
	;;

	wsconfig)
		WSCONFIG_JAR=$CF_DIR/runtime/lib/wsconfig.jar

		if [ $# -eq 0 ]; then
			# no arguments so display built-in help from wsconfig.jar
			$JAVA_EXECUTABLE -jar $WSCONFIG_JAR -help
			break
		else
			# brief help
			if [ "$2" = "help" ]; then
				echo "To configure a webserver connector you must specify the -ws and -dir options."
				echo "If configuring Apache it is recomended that you also specify the -bin and "
				echo "-script options."
				echo ""
				echo "To list all configured webserver connectors use the -list option."
				echo "To remove a configured webserver connector use the -r option with the "
				echo "-ws and -dir options."
				echo "To remove all webserver connectors use the -uninstall option."
				echo "To upgrade all installed webserver connectors use the -upgrade option."
				echo ""
				echo "For more detailed help see $0 $1."
			fi
			break
		fi

		# pass on all args to wsconfig.jar
		shift
		$JAVA_EXECUTABLE -jar $WSCONFIG_JAR $@ -coldfusion
	;;

	*)
		echo "Usage:$0 (start|stop|restart|status|wsconfig)"
	;;

esac


exit 0

