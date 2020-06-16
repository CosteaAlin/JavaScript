const submit=document.querySelector('.submit');
submit.addEventListener('click',()=> {
        const billAmount=document.getElementById('bill-amount').value;
        const people=document.getElementById('people-input').value;
        const service=document.getElementById('service').value;
        let isValid=true;
        validate(billAmount,people,service);
        function validate(billAmount, people, service)
        {
            
            const status=document.querySelector('.status');
            if( billAmount === '')
            {
                    status.innerHTML+='<p>Bill amount cannot be blank.</p>';
                    isValid=false;
            }
            if( people === '')
            {
                    status.innerHTML+='<p>Number of users must be greater than 0.</p>';
                    isValid=false;
            }
            if(service === '0')
            {
                status.innerHTML+='<p>Please select a service.</p>';
                isValid=false;
            }
            setTimeout(function(){
                status.innerHTML='';
              }, 7000);
        } 
        
        if(isValid==true)
        {
            
            function caculateTip(billAmount, people, service)
            {
                 let tip='';
                 if(service ===  '1')
                 {
                    tip=0.02;
                 }  
                else if(service ===  '2')
                {
                    tip=0.1;
                }
                 else
                 {
                    tip=0.2;
                 }
                const tipAmount=Number(billAmount)*tip;
                console.log(tipAmount);
                const totalAmount=Number(billAmount)+Number(tipAmount);
                const eachPerson=Number(totalAmount)/Number(people);
                
                return [tipAmount, totalAmount, eachPerson];
            }
            const results= caculateTip(billAmount, people, service);
            const tipResult=document.querySelector('#tip-result');
            const totalResult=document.querySelector('#total-result');
            const personsResult=document.querySelector('#persons-result');
            tipResult.innerHTML='Tip Amount $ ' +results[0].toFixed(2);
            totalResult.innerHTML='Total Amount $ ' +results[1].toFixed(2);
            personsResult.innerHTML='Each Person Owes $' +results[2].toFixed(2);
               
            setTimeout(function(){
                tipResult.innerHTML='';
                totalResult.innerHTML='';
                personsResult.innerHTML='';
                document.getElementById('bill-amount').value='';
                document.getElementById('people-input').value='';
                document.getElementById('service').value='0';
            },10000)

        }
           
       
});